import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PisCofinsIcmsEnergiaComponent } from './pis-cofins-icms-energia.component';

describe('PisCofinsIcmsEnergiaComponent', () => {
  let component: PisCofinsIcmsEnergiaComponent;
  let fixture: ComponentFixture<PisCofinsIcmsEnergiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PisCofinsIcmsEnergiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PisCofinsIcmsEnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
