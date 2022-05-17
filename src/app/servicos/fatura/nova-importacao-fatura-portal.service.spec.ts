import { TestBed } from '@angular/core/testing';

import { NovaImportacaoFaturaPortalService } from './nova-importacao-fatura-portal.service';

describe('NovaImportacaoFaturaPortalService', () => {
  let service: NovaImportacaoFaturaPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovaImportacaoFaturaPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
