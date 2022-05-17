import { TestBed } from '@angular/core/testing';

import { AderirPlanoService } from './aderir-plano.service';

describe('AderirPlanoService', () => {
  let service: AderirPlanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AderirPlanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
