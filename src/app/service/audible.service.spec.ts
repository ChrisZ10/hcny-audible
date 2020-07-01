import { TestBed } from '@angular/core/testing';

import { AudibleService } from './audible.service';

describe('AudibleService', () => {
  let service: AudibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
