import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent, HttpClientTestingModule, FormsModule], // Use `imports` para standalone components
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    const spy = spyOn(component, 'fetchMovies');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should filter movies by year', () => {
    component.movies = [
      { year: 2000, title: 'Movie1' },
      { year: 2001, title: 'Movie2' },
    ];
    component.yearFilter = '2000';
    component.applyFilters();
    expect(component.filteredMovies).toEqual([{ year: 2000, title: 'Movie1' }]);
  });

  it('should filter movies by winner', () => {
    component.movies = [
      { winner: true, title: 'Movie1' },
      { winner: false, title: 'Movie2' },
    ];
    component.winnerFilter = 'yes';
    component.applyFilters();
    expect(component.filteredMovies).toEqual([{ winner: true, title: 'Movie1' }]);
  });

  it('should paginate movies', () => {
    component.filteredMovies = Array.from({ length: 30 }, (_, i) => ({ title: `Movie${i + 1}` }));
    component.itemsPerPage = 10;
    component.currentPage = 2;
    const paginatedMovies = component.getPaginatedMovies();
    expect(paginatedMovies.length).toBe(10);
    expect(paginatedMovies[0]).toEqual({ title: 'Movie11' });
  });
});
