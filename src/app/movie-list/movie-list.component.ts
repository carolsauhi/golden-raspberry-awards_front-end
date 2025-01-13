import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Inclui o FormsModule para os filtros
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; // Todos os filmes
  filteredMovies: any[] = []; // Filmes após os filtros serem aplicados
  yearFilter: string = ''; // Filtro por ano
  winnerFilter: string = ''; // Filtro por vencedor (Yes/No)
  currentPage: number = 1; // Página atual
  itemsPerPage: number = 10; // Quantidade de itens por página

  private apiUrl: string = 'https://challenge.outsera.tech/movies'; // URL da API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovies(); // Chama a API ao inicializar o componente
  }

  /**
   * Faz a chamada da API e inicializa os dados
   */
  fetchMovies(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        // console.log(response._embedded.movies)
        if (response._embedded && response._embedded.movies) {
          this.movies = response._embedded.movies;
          this.applyFilters(); // Aplica os filtros após carregar os filmes
        } else {
          console.error('Formato inesperado da resposta:', response);
        }
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);
      },
    });
  }

  /**
   * Aplica os filtros de ano e vencedor
   */
  applyFilters(): void {
    this.filteredMovies = this.movies.filter((movie) => {
      const matchesYear =
        this.yearFilter === '' || movie.year.toString().includes(this.yearFilter);

      const matchesWinner =
        this.winnerFilter === '' ||
        (this.winnerFilter === 'yes' && movie.winner) ||
        (this.winnerFilter === 'no' && !movie.winner);

      return matchesYear && matchesWinner;
    });

    this.currentPage = 1; // Reseta para a primeira página após filtrar
  }

  /**
   * Obtém os filmes para a página atual
   */
  getPaginatedMovies(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredMovies.slice(startIndex, endIndex);
  }

  /**
   * Altera a página atual
   */
  changePage(page: number): void {
    this.currentPage = page;
  }

    /**
   * Calcula o número total de páginas com base nos filmes filtrados e itens por página.
   */
  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.filteredMovies.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1); 
  }

}
