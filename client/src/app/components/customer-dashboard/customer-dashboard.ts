import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';
import { AppHeaderComponent } from '../app-header/app-header';
@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css']
})
export class CustomerDashboardComponent implements OnInit {

  medicines: any[] = [];
  allMedicines: any[] = [];

  searchText: string = '';
  selectedCategory: string = 'ALL';

  categories: string[] = [
    'ALL',
    'Fever',
    'Diabetes',
    'BP',
    'Pain',
    'Antibiotic',
    'Nerve'
  ];

  constructor(
    private medicineService: MedicineService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {

    this.medicineService.getAllMedicines().subscribe({
      next: (data: any[]) => {
        this.allMedicines = data || [];
        this.medicines = [...this.allMedicines];
        this.cdr.detectChanges();
      }
    });
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  applyFilters(): void {

    let filtered = [...this.allMedicines];

    // ✅ FIXED CATEGORY FILTER (correct field)
    if (this.selectedCategory !== 'ALL') {
      filtered = filtered.filter(med =>
        med.category === this.selectedCategory
      );
    }

    // SEARCH FILTER
    const text = this.searchText.toLowerCase().trim();

    if (text) {
      filtered = filtered.filter(med =>
        med.name?.toLowerCase().includes(text) ||
        med.composition?.toLowerCase().includes(text)
      );
    }

    this.medicines = filtered;
  }
}