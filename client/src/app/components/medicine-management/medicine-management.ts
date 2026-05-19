import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { MedicineService }
from '../../services/medicine.service';

@Component({
  selector: 'app-medicine-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './medicine-management.html',
  styleUrls: ['./medicine-management.css']
})
export class MedicineManagementComponent
implements OnInit {

  searchText: string = '';

  medicines: any[] = [];

  allMedicines: any[] = [];

  constructor(
  private medicineService: MedicineService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    this.loadMedicines();
  }

  // LOAD
  loadMedicines() {

    this.medicineService
        .getAllMedicines()
        .subscribe({

      next: (data: any[]) => {

        console.log(data);

        this.medicines = data;

        this.allMedicines = data;
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.log(err);
      }
    });
  }

  // SEARCH
  applyFilter() {

    const text =
      this.searchText.toLowerCase();

    this.medicines =

      this.allMedicines.filter(med =>

        med.name?.toLowerCase()
          .includes(text)

        ||

        med.composition?.toLowerCase()
          .includes(text)
      );
  }

  // SORT
  sortByName() {

    this.medicines =

      [...this.medicines].sort((a, b) =>

        a.name.localeCompare(b.name)
      );
  }

  // DELETE
  deleteMedicine(id: number) {

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