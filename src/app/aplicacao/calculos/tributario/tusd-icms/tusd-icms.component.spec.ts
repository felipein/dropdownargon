import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TusdIcmsComponent } from './tusd-icms.component';

describe('TusdIcmsComponent', () => {
  let component: TusdIcmsComponent;
  let fixture: ComponentFixture<TusdIcmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TusdIcmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TusdIcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
