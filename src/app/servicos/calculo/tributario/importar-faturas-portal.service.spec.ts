import { TestBed } from '@angular/core/testing';

import { ImportarFaturasPortalService } from './importar-faturas-portal.service';

describe('ImportarFaturasPortalService', () => {
  let service: ImportarFaturasPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportarFaturasPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
