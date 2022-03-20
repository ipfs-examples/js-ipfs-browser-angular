import { TestBed } from '@angular/core/testing';

import { OrbitDbService } from './orbit-db.service';

describe('OrbitDbService', () => {
  let service: OrbitDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrbitDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
