import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosDashboardComponent } from './calculos-dashboard.component';

describe('CalculosDashboardComponent', () => {
  let component: CalculosDashboardComponent;
  let fixture: ComponentFixture<CalculosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculosDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
