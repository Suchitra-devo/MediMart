import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MedicineService } from '../../services/medicine.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-medicine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-medicine.html',
  styleUrls: ['./edit-medicine.css']
})
export class EditMedicineComponent implements OnInit {

  medicineId: number = 0;

  medicine: any = {
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
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.medicineId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadMedicine();
  }

  // =========================
  // LOAD MEDICINE
  // =========================

  loadMedicine() {

    this.medicineService
      .getMedicineById(this.medicineId)
      .subscribe({

        next: (data: any) => {

          this.medicine = {
            name: data.name,
            composition: data.composition,
            description: data.description,
            alternateMedicine: data.alternateMedicine,
            category: data.category || '',
            quantity: data.quantity,
            price: data.price,
            expiryDate: data.expiryDate
          };

          this.cdr.detectChanges();
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  // =========================
  // UPDATE MEDICINE
  // =========================

  updateMedicine() {

    if (!this.medicine.name ||
        this.medicine.quantity <= 0 ||
        this.medicine.price <= 0 ||
        !this.medicine.expiryDate ||
        !this.medicine.category) {

      alert('Please fill all mandatory fields');

      return;
    }

    this.medicineService
      .updateMedicine(this.medicineId, this.medicine)
      .subscribe({

        next: () => {

          alert('Medicine Updated Successfully');

          this.router.navigate(['/medicine-management']);
        },

        error: (err) => {
          console.log(err);
        }
      });
  }
}