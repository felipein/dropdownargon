import { TestBed } from '@angular/core/testing';

import { CalculoTusdIcmsService } from './calculo-tusd-icms.service';

describe('CalculoTusdIcmsService', () => {
  let service: CalculoTusdIcmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculoTusdIcmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
