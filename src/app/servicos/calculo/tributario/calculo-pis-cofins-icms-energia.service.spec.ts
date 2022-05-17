import { TestBed } from '@angular/core/testing';

import { CalculoPisCofinsIcmsEnergiaService } from './calculo-pis-cofins-icms-energia.service';

describe('CalculoPisCofinsIcmsEnergiaService', () => {
  let service: CalculoPisCofinsIcmsEnergiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculoPisCofinsIcmsEnergiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
