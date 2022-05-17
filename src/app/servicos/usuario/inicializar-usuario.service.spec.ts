import { TestBed } from '@angular/core/testing';

import { InicializarUsuarioService } from './inicializar-usuario.service';

describe('InicializarUsuarioService', () => {
  let service: InicializarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicializarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
