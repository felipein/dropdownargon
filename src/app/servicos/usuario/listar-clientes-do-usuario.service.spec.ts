import { TestBed } from '@angular/core/testing';

import { ListarClientesDoUsuarioService } from './listar-clientes-do-usuario.service';

describe('ListarClientesDoUsuarioService', () => {
  let service: ListarClientesDoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarClientesDoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
