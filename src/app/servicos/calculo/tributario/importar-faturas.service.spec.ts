import { TestBed } from '@angular/core/testing';

import { ImportarFaturasService } from './importar-faturas.service';

describe('ImportarFaturasService', () => {
  let service: ImportarFaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportarFaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
