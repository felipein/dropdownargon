import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAssinaturaComponent } from './nova-assinatura.component';

describe('NovaAssinaturaComponent', () => {
  let component: NovaAssinaturaComponent;
  let fixture: ComponentFixture<NovaAssinaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaAssinaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaAssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
