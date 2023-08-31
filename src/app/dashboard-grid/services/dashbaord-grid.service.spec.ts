import { TestBed } from '@angular/core/testing';

import { DashbaordGridService } from './dashbaord-grid.service';

describe('DashbaordGridService', () => {
  let service: DashbaordGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashbaordGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
