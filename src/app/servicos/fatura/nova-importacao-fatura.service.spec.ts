import { TestBed } from '@angular/core/testing';

import { NovaImportacaoFaturaService } from './nova-importacao-fatura.service';

describe('NovaImportacaoFaturaService', () => {
  let service: NovaImportacaoFaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovaImportacaoFaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
