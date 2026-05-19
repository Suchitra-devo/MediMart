import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-cashier-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cashier-dashboard.html',
  styleUrls: ['./cashier-dashboard.css']
})
export class CashierDashboardComponent implements OnInit {

  searchText: string = '';

  medicines: any[] = [];
  allMedicines: any[] = [];

  cart: any[] = [];

  discountEnabled: boolean = false;
  discountAmount: number = 0;

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  // =========================
  // LOAD MEDICINES
  // =========================
  loadMedicines() {

    this.medicineService.getAllMedicines().subscribe({

      next: (data: any[]) => {

        const processedData = data.map(med => ({
          ...med,
          selectedQty: 1
        }));

        this.allMedicines = processedData;
        this.medicines = [...this.allMedicines];

        console.log("Loaded medicines:", this.medicines);
      },

      error: (err) => {
        console.error("Error loading medicines:", err);
      }

    });
  }

  // =========================
  // SEARCH
  // =========================
  applyFilter() {

    const text = this.searchText.toLowerCase();

    this.medicines = this.allMedicines.filter(med =>
      med.name?.toLowerCase().includes(text) ||
      med.composition?.toLowerCase().includes(text)
    );
  }

  // =========================
  // QUANTITY CONTROL
  // =========================
  increaseQty(med: any) {
    med.selectedQty++;
  }

  decreaseQty(med: any) {
    if (med.selectedQty > 1) {
      med.selectedQty--;
    }
  }

  // =========================
  // ADD TO CART
  // =========================
  addToCart(med: any) {

    const qty = med.selectedQty || 1;

    const existing = this.cart.find(item => item.id === med.id);

    if (existing) {

      existing.quantity += qty;
      existing.total = existing.quantity * existing.price;

    } else {

      this.cart.push({
        id: med.id,
        name: med.name,
        price: med.price,
        quantity: qty,
        total: med.price * qty
      });

    }

    med.selectedQty = 1;
  }

  // =========================
  // CART UPDATE
  // =========================
  updateQuantity(item: any) {
    item.total = item.quantity * item.price;
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  // =========================
  // BILL CALCULATION
  // =========================
  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.total, 0);
  }

  getFinalTotal(): number {

    let total = this.getSubtotal();

    if (this.discountEnabled && this.discountAmount > 0) {
      total -= this.discountAmount;
    }

    return total;
  }

  // =========================
  // NAVIGATION PLACEHOLDER
  // =========================
  goToInvoice() {
    console.log("Generate Invoice Clicked", this.cart);
  }
}