import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCalculoComponent } from './novo-calculo.component';

describe('NovoCalculoComponent', () => {
  let component: NovoCalculoComponent;
  let fixture: ComponentFixture<NovoCalculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoCalculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
