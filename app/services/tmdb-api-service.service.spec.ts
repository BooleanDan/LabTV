import { TestBed } from '@angular/core/testing';

import { TmdbApiServiceService } from './tmdb-api-service.service';

describe('TmdbApiServiceService', () => {
  let service: TmdbApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
