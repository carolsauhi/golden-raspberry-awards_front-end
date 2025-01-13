import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter winners by year', () => {
    component.allMovies = [
      { winner: true, year: 2000, title: 'Movie1' },
      { winner: true, year: 2001, title: 'Movie2' },
    ];
    component.selectedYear = '2000';
    component.fetchWinnersByYear();
    expect(component.winnersByYear).toEqual([{ winner: true, year: 2000, title: 'Movie1' }]);
  });
});
