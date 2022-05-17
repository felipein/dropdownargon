import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAssinaturaConcluidaComponent } from './nova-assinatura-concluida.component';

describe('NovaAssinaturaConcluidaComponent', () => {
  let component: NovaAssinaturaConcluidaComponent;
  let fixture: ComponentFixture<NovaAssinaturaConcluidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaAssinaturaConcluidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaAssinaturaConcluidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
