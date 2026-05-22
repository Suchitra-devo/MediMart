import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header';
import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import {
  RouterModule,
  ActivatedRoute
}
from '@angular/router';

import {
  MedicineService
}
from '../../services/medicine.service';

@Component({
  selector: 'app-medicine-management',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,AppHeaderComponent 
  ],

  templateUrl: './medicine-management.html',

  styleUrls: ['./medicine-management.css']
})
export class MedicineManagementComponent
implements OnInit {

  searchText: string = '';

  medicines: any[] = [];

  allMedicines: any[] = [];

  showLowStockOnly = false;

  constructor(
    private medicineService: MedicineService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.showLowStockOnly =
        params['lowStock'] === 'true';

      this.loadMedicines();
    });
  }

  // =========================
  // LOAD MEDICINES
  // =========================

  loadMedicines(): void {

    this.medicineService
      .getAllMedicines()
      .subscribe({

        next: (data: any[]) => {

          console.log('Medicines:', data);

          this.allMedicines = data || [];

          // LOW STOCK FILTER
          if (this.showLowStockOnly) {

            this.medicines =
              this.allMedicines.filter(
                med => med.quantity <= 10
              );

          } else {

            this.medicines =
              [...this.allMedicines];
          }

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  // =========================
  // SEARCH FILTER
  // =========================

  applyFilter(): void {

    const text =
      this.searchText
        .toLowerCase()
        .trim();

    let filteredData = [];

    // BASE FILTER
    if (this.showLowStockOnly) {

      filteredData =
        this.allMedicines.filter(
          med => med.quantity <= 10
        );

    } else {

      filteredData =
        [...this.allMedicines];
    }

    // SEARCH FILTER
    if (!text) {

      this.medicines = filteredData;

      return;
    }

    this.medicines =
      filteredData.filter(med =>

        med.name
          ?.toLowerCase()
          .includes(text)

        ||

        med.composition
          ?.toLowerCase()
          .includes(text)
      );
  }

  // =========================
  // SORT
  // =========================

  sortByName(): void {

    this.medicines =
      [...this.medicines].sort((a, b) =>

        a.name.localeCompare(b.name)
      );
  }

  // =========================
  // DELETE
  // =========================

  deleteMedicine(id: number): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this medicine?'
      );

    if (!confirmDelete) {

      return;
    }

    this.medicineService
      .deleteMedicine(id)
      .subscribe({

        next: () => {

          this.loadMedicines();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }
}