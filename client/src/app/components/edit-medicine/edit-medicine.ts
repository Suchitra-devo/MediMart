import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MedicineService }
from '../../services/medicine.service';


import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-medicine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-medicine.html',
  styleUrls: ['./edit-medicine.css']
})
export class EditMedicineComponent
implements OnInit {

  medicineId: number = 0;

  medicine: any = {};

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
        quantity: data.quantity,
        price: data.price,
        expiryDate: data.expiryDate
      };

      // FORCE UI UPDATE
      this.cdr.detectChanges();
    },

    error: (err) => {
      console.log(err);
    }
  });
}

  updateMedicine() {

    this.medicineService
        .updateMedicine(
          this.medicineId,
          this.medicine
        )
        .subscribe({

      next: () => {

        alert('Medicine Updated Successfully');

        this.router.navigate([
          '/medicine-management'
        ]);
      },

      error: (err) => {

        console.log(err);
      }
    });
  }
}