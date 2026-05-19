import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicine } from './edit-medicine';

describe('EditMedicine', () => {
  let component: EditMedicine;
  let fixture: ComponentFixture<EditMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMedicine],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMedicine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
