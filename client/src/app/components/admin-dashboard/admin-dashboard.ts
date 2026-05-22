import {
  Component,
  OnInit,
  ChangeDetectorRef
}
from '@angular/core';

import {
  RouterModule,
  Router
}
from '@angular/router';

import {
  CommonModule
}
from '@angular/common';

import {
  AppHeaderComponent
}
from '../app-header/app-header';

import {
  MedicineService
}
from '../../services/medicine.service';

@Component({
  selector: 'app-admin-dashboard',

  standalone: true,

  imports: [
    RouterModule,
    CommonModule,
    AppHeaderComponent
  ],

  templateUrl: './admin-dashboard.html',

  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent
implements OnInit {

  totalMedicines = 0;

  totalStock = 0;

  lowStockCount = 0;

  constructor(
    private router: Router,
    private medicineService: MedicineService,
    private cdr: ChangeDetectorRef
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.loadDashboardStats();
  }

  // =========================
  // LOAD DASHBOARD STATS
  // =========================

  loadDashboardStats(): void {

    this.medicineService
      .getAllMedicines()
      .subscribe({

        next: (data: any[]) => {

          const medicines = data || [];

          // TOTAL MEDICINES
          this.totalMedicines =
            medicines.length;

          // TOTAL STOCK
          this.totalStock =
            medicines.reduce(
              (sum, med) =>
                sum + (med.quantity || 0),
              0
            );

          // LOW STOCK
          this.lowStockCount =
            medicines.filter(
              med => med.quantity <= 10
            ).length;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  // =========================
  // VIEW LOW STOCK
  // =========================

  viewLowStock(): void {

    this.router.navigate(
      ['/medicine-management'],
      {
        queryParams: {
          lowStock: true
        }
      }
    );
  }
}