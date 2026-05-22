import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { MedicineService }
from '../../services/medicine.service';

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-medicine.html',
  styleUrls: ['./add-medicine.css']
})
export class AddMedicineComponent {

  medicine = {
    name: '',
    composition: '',
    description: '',
    alternateMedicine: '',
    category: '',
    quantity: 0,
    price: 0,
    expiryDate: ''
  };

  constructor(
    private medicineService: MedicineService,
    private router: Router
  ) {}

  // CATEGORY HANDLER (SAFE)
  onCategoryChange(event: Event): void {

    const value =
      (event.target as HTMLSelectElement).value;

    this.medicine.category = value;
  }

  saveMedicine() {

    // VALIDATION
    if (
      !this.medicine.name ||
      !this.medicine.category ||
      this.medicine.quantity <= 0 ||
      this.medicine.price <= 0 ||
      !this.medicine.expiryDate
    ) {
      alert('Please fill all mandatory fields correctly');
      return;
    }

    this.medicineService.addMedicine(this.medicine)
      .subscribe({

        next: () => {

          alert('Medicine Added Successfully');

          this.router.navigate(['/medicine-management']);
        },

        error: (err) => {
          console.log(err);
        }
      });
  }
}