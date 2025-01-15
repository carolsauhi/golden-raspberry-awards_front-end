import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DashboardComponent],
    });

    const fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch years with multiple winners', () => {
    const mockResponse = {
      years: [
        { year: 1980, count: 2 },
        { year: 1990, count: 3 },
      ],
    };

    component.populateYearsWithMultipleWinners();

    const req = httpTestingController.expectOne(
      (request) =>
        request.url === component.apiUrl &&
        request.params.has('projection') &&
        request.params.get('projection') === 'years-with-multiple-winners'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.yearsWithMultipleWinners).toEqual(mockResponse.years);
    expect(component.yearsWithMultipleWinners.length).toBe(2);
  });

  it('should fetch top 3 studios with most wins', () => {
    const mockResponse = {
      studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 8 },
        { name: 'Studio C', winCount: 5 },
        { name: 'Studio D', winCount: 4 },
      ],
    };

    component.populateStudiosWithMostWins();

    const req = httpTestingController.expectOne(
      (request) =>
        request.url === component.apiUrl &&
        request.params.has('projection') &&
        request.params.get('projection') === 'studios-with-win-count'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.studiosWithMostWins.length).toBe(3);
    expect(component.studiosWithMostWins[0].name).toBe('Studio A');
    expect(component.studiosWithMostWins[1].name).toBe('Studio B');
    expect(component.studiosWithMostWins[2].name).toBe('Studio C');
  });

  it('should fetch producers with max and min win intervals', () => {
    const mockResponse = {
      max: [{ producer: 'Producer A', interval: 15 }],
      min: [{ producer: 'Producer B', interval: 1 }],
    };

    component.populateProducersWinIntervals();

    const req = httpTestingController.expectOne(
      (request) =>
        request.url === component.apiUrl &&
        request.params.has('projection') &&
        request.params.get('projection') === 'max-min-win-interval-for-producers'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.producersWinIntervals.max).toEqual(mockResponse.max);
    expect(component.producersWinIntervals.min).toEqual(mockResponse.min);
  });

  it('should fetch winners by year', () => {
    const mockResponse = [
      {
        id: 1,
        year: 2018,
        title: 'Holmes & Watson',
        studios: ['Columbia Pictures'],
        producers: ['Producer A', 'Producer B'],
        winner: true,
      },
    ];

    component.selectedYear = '2018';
    component.fetchWinnersByYear();

    const req = httpTestingController.expectOne(
      (request) =>
        request.url === component.apiUrl &&
        request.params.has('winner') &&
        request.params.has('year') &&
        request.params.get('winner') === 'true' &&
        request.params.get('year') === '2018'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.winnersByYear).toEqual(mockResponse);
    expect(component.winnersByYear.length).toBe(1);
    expect(component.winnersByYear[0].title).toBe('Holmes & Watson');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
