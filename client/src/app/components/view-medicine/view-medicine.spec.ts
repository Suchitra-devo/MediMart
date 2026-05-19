import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicine } from './view-medicine';

describe('ViewMedicine', () => {
  let component: ViewMedicine;
  let fixture: ComponentFixture<ViewMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMedicine],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMedicine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
