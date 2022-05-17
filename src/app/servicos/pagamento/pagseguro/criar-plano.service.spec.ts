import { TestBed } from '@angular/core/testing';

import { CriarPlanoService } from './criar-plano.service';

describe('CriarPlanoService', () => {
  let service: CriarPlanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarPlanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
