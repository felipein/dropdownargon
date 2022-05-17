import { TestBed } from '@angular/core/testing';

import { AtualizarUsuarioService } from './atualizar-usuario.service';

describe('AtualizarUsuarioService', () => {
  let service: AtualizarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
