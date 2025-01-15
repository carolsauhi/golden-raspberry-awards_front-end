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
  private apiUrl: string = 'https://challenge.outsera.tech/api/movies';

  allMovies: any[] = [];

  yearsWithMultipleWinners: any[] = []; // Dados do painel 1
  studiosWithMostWins: any[] = []; // Dados do painel 2
  producersWinIntervals: { max: any[]; min: any[] } = { max: [], min: [] }; // Dados do painel 3
  winnersByYear: any[] = []; // Dados do painel 4
  selectedYear: string = ''; // Ano selecionado no painel 4

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.populatePanels()
  }

  /**
   * Processa os dados globais para preencher os painéis
   */
  populatePanels(): void {
    this.populateYearsWithMultipleWinners();
    this.populateStudiosWithMostWins();
    this.populateProducersWinIntervals();
  }

  // Painel 1
  populateYearsWithMultipleWinners(): void {
    const params = {
      projection: 'years-with-multiple-winners'
    };

    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.yearsWithMultipleWinners = response.years;
      },
      error: (error) => {
        console.error('Erro ao buscar anos com vários vencedores:', error);
      },
    });
  }

  // Painel 2
  populateStudiosWithMostWins(): void {
    const params = {
      projection: 'studios-with-win-count'
    };

    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.studiosWithMostWins = response.studios
          .sort((a: any, b: any) => b.winCount - a.winCount) 
          .slice(0, 3); 
      },
      error: (error) => {
        console.error('Erro ao buscar estúdios com mais vitórias:', error);
      },
    });
  }

  // Painel 3
  populateProducersWinIntervals(): void {
    const params = {
      projection: 'max-min-win-interval-for-producers'
    };

    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.producersWinIntervals = response;
      },
      error: (error) => {
        console.error('Erro ao buscar intervalo (máx e mín) de vitória para produtores :', error);
      },
    });
  }

  // Painel 4
  fetchWinnersByYear(): void {
    const params = {
      winner: true,
      year: this.selectedYear.toString(),
    };

    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.winnersByYear = response;
      },
      error: (error) => {
        console.error('Erro ao buscar ganhadores por ano:', error);
      },
    });
  }

}