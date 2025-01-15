import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });

    const fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create the movie list component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies and populate variables', () => {
    httpClientSpy.get.and.returnValue(of({ content: [], totalPages: 5 }));

    component.fetchMovies();

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      component.apiUrl,
      jasmine.objectContaining({ params: jasmine.any(Object) })
    );

    expect(component.totalPages).toBe(5);
    expect(component.movies.length).toBe(0);
  });

  it('should apply filters correctly', () => {
    component.movies = [
      { title: 'Movie A', year: 1980, winner: true },
      { title: 'Movie B', year: 1981, winner: false },
    ];

    component.yearFilter = '1980';
    component.applyFilters();

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Movie A');
  });
});
