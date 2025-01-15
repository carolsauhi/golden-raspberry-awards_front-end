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
  yearFilter: any = ''; // Filtro por ano
  winnerFilter: any = ''; // Filtro por vencedor (Yes/No)

  currentPage: number = 1; // Página atual
  pageSize: number = 15; // Tamanho da página
  totalPages: number = 0; // Total de páginas
  showNoResultsMessage: boolean = false; // Controle para exibir a mensagem de atenção

  private apiUrl: string = 'https://challenge.outsera.tech/api/movies'; // URL da API

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.fetchPages();
    this.fetchMovies(); // Chama a API ao inicializar o componente
  }

  /**
 * Busca os filmes da API e atualiza a tabela
 */
  fetchMovies(): void {
    const params = {
      page: (this.currentPage - 1).toString(),
      size: this.pageSize.toString(),
      year: '',
      winner: ''
    };

    // Adiciona os filtros, se aplicáveis
    if (this.yearFilter.length === 4) {
      params.year = this.yearFilter;
    }
    if (this.winnerFilter) {
      params.winner = this.winnerFilter;
    }

    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.movies = response.content;
        this.filteredMovies = [...this.movies];
        this.totalPages = response.totalPages;
        this.showNoResultsMessage = this.filteredMovies.length === 0;
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);
      },
    });
  }

  applyFilters(): void {
    // Reseta para a primeira página ao aplicar filtros
    this.currentPage = 1;

    // Verifica se o filtro de ano tem 4 caracteres
    if (this.yearFilter.length === 4 || this.yearFilter === '') {
      this.fetchMovies();
    } else {
      this.showNoResultsMessage = false; // Não exibe mensagem enquanto o ano não for válido
    }
  }

  /**
 * Gera o intervalo de páginas para a paginação
 */
  getPaginationRange(): number[] {
    const rangeSize = 5; // Quantidade máxima de páginas visíveis
    const start = Math.max(1, this.currentPage - Math.floor(rangeSize / 2));
    const end = Math.min(start + rangeSize - 1, this.totalPages);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  /**
   * Vai para a primeira página
   */
  goToFirstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.fetchMovies();
    }
  }

  /**
   * Vai para a última página
   */
  goToLastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.fetchMovies();
    }
  }

  /**
   * Vai para uma página específica
   */
  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchMovies();
    }
  }

  /**
   * Muda para a página anterior, se aplicável
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }

  /**
   * Muda para a próxima página, se aplicável
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }
}
