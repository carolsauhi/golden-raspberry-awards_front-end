import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit {
  private apiUrl: string = 'https://challenge.outsera.tech/movies'; 

  allMovies: any[] = []; 

  yearsWithMultipleWinners: any[] = []; // Dados do painel 1
  studiosWithMostWins: any[] = []; // Dados do painel 2
  producersWinIntervals: { max: any[]; min: any[] } = { max: [], min: [] }; // Dados do painel 3
  winnersByYear: any[] = []; // Dados do painel 4
  selectedYear: string = ''; // Ano selecionado no painel 4

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllMovies(); // Carrega todos os dados da API ao iniciar o componente
  }


  loadAllMovies(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        if (response._embedded && response._embedded.movies) {
          this.allMovies = response._embedded.movies; // Armazena os filmes
          this.populatePanels(); // Processa os dados para os painéis
        } else {
          console.error('Formato inesperado da resposta:', response);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar os filmes:', error);
      },
    });
  }

  /**
   * Processa os dados globais para preencher os painéis
   */
  populatePanels(): void {
    this.populateYearsWithMultipleWinners();
    this.populateStudiosWithMostWins();
    this.populateProducersWinIntervals();
  }


  populateYearsWithMultipleWinners(): void {
    const yearCounts: { [key: number]: number } = {}; // Mapeia anos para a contagem de vencedores
  
    // Conta o número de vencedores por ano
    this.allMovies.forEach((movie) => {
      if (movie.winner) {
        yearCounts[movie.year] = (yearCounts[movie.year] || 0) + 1;
      }
    });
  
    // Filtra os anos com mais de um vencedor e formata os dados
    this.yearsWithMultipleWinners = Object.entries(yearCounts)
      .filter(([year, count]) => count > 1) // Apenas anos com mais de um vencedor
      .map(([year, count]) => ({
        year: Number(year), // Converte a chave para número
        winCount: count, // Número de vencedores
      }));
  }
  
  
  populateStudiosWithMostWins(): void {
    const studioCounts: { [key: string]: number } = {};
    this.allMovies.forEach((movie) => {
      if (movie.winner && movie.studios) {
        movie.studios.forEach((studio: string) => {
          studioCounts[studio] = (studioCounts[studio] || 0) + 1;
        });
      }
    });

    this.studiosWithMostWins = Object.keys(studioCounts)
      .map((studio) => ({
        name: studio,
        winCount: studioCounts[studio],
      }))
      .sort((a, b) => b.winCount - a.winCount)
      .slice(0, 3); // Retorna os três primeiros
  }


  populateProducersWinIntervals(): void {
    const producerWins: { [key: string]: number[] } = {};
    this.allMovies.forEach((movie) => {
      if (movie.winner && movie.producers) {
        movie.producers.forEach((producer: string) => {
          if (!producerWins[producer]) {
            producerWins[producer] = [];
          }
          producerWins[producer].push(movie.year);
        });
      }
    });

    const intervals = Object.keys(producerWins).map((producer) => {
      const years = producerWins[producer].sort((a, b) => a - b);
      const intervals = years.slice(1).map((year, index) => year - years[index]);
      return {
        producer: producer,
        interval: Math.max(...intervals, 0),
        previousWin: years[0],
        followingWin: years[years.length - 1],
      };
    });

    this.producersWinIntervals.max = intervals
      .sort((a, b) => b.interval - a.interval)
      .slice(0, 1); // Maior intervalo

    this.producersWinIntervals.min = intervals
      .sort((a, b) => a.interval - b.interval)
      .slice(0, 1); // Menor intervalo
  }


fetchWinnersByYear(): void {
  if (!this.selectedYear) {
    this.winnersByYear = this.allMovies.filter((movie) => movie.winner);
  } else {
    this.winnersByYear = this.allMovies.filter(
      (movie) => movie.winner && movie.year.toString() === this.selectedYear
    );
  }
}

}