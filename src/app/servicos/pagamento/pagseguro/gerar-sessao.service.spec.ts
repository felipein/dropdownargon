import { TestBed } from '@angular/core/testing';

import { GerarSessaoService } from './gerar-sessao.service';

describe('GerarSessaoService', () => {
  let service: GerarSessaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerarSessaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
