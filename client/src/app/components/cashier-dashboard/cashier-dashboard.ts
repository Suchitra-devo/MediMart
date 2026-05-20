import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { StoreStatusService }
from '../../services/store-status.service';

import { AppHeaderComponent }
from '../app-header/app-header';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  MedicineService
} from '../../services/medicine.service';

@Component({
  selector: 'app-cashier-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppHeaderComponent
  ],
  templateUrl: './cashier-dashboard.html',
  styleUrls: ['./cashier-dashboard.css']
})
export class CashierDashboardComponent
implements OnInit {

  searchText: string = '';

  customerName: string = '';

  medicines: any[] = [];

  allMedicines: any[] = [];

  cart: any[] = [];

  discountEnabled = false;

  discountAmount = 0;

  storeOpen = true;

  constructor(
    private medicineService: MedicineService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storeStatusService: StoreStatusService
  ) {}

  ngOnInit(): void {

    this.loadMedicines();

    // LIVE STORE STATUS
    this.storeStatusService
      .storeStatus$
      .subscribe(status => {

      this.storeOpen = status;

      this.cdr.detectChanges();
    });
  }

  // ============================
  // LOAD MEDICINES
  // ============================
  loadMedicines(): void {

    this.medicineService
      .getAllMedicines()
      .subscribe({

      next: (data: any[]) => {

        console.log(
          'MEDICINES RECEIVED:',
          data
        );

        const safeData =
          Array.isArray(data)
          ? data
          : [];

        this.allMedicines =
          safeData.map(med => ({
            ...med,
            selectedQty: 1
          }));

        this.medicines =
          [...this.allMedicines];

        this.cdr.detectChanges();

        console.log(
          'FINAL MEDICINES:',
          this.medicines
        );
      },

      error: (err) => {

        console.error(
          'ERROR LOADING MEDICINES:',
          err
        );
      }
    });
  }

  // ============================
  // SEARCH
  // ============================
  applyFilter(): void {

    const text =
      this.searchText
      .toLowerCase()
      .trim();

    if (!text) {

      this.medicines =
        [...this.allMedicines];

      return;
    }

    this.medicines =
      this.allMedicines.filter(med =>

        med.name
          ?.toLowerCase()
          .includes(text)

        ||

        med.composition
          ?.toLowerCase()
          .includes(text)
      );
  }

  // ============================
  // STORE TOGGLE
  // ============================
  toggleStoreStatus(): void {

    this.storeStatusService
      .setStoreStatus(!this.storeOpen);
  }

  // ============================
  // QUANTITY
  // ============================
  increaseQty(med: any): void {

    med.selectedQty++;
  }

  decreaseQty(med: any): void {

    if (med.selectedQty > 1) {

      med.selectedQty--;
    }
  }

  // ============================
  // ADD TO CART
  // ============================
  addToCart(med: any): void {

    const qty =
      med.selectedQty || 1;

    const existing =
      this.cart.find(
        item => item.id === med.id
      );

    if (existing) {

      existing.quantity += qty;

      existing.total =
        existing.quantity * existing.price;

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

  // ============================
  // CART UPDATE
  // ============================
  updateQuantity(item: any): void {

    item.total =
      item.quantity * item.price;
  }

  removeFromCart(id: number): void {

    this.cart =
      this.cart.filter(
        item => item.id !== id
      );
  }

  // ============================
  // BILL
  // ============================
  getSubtotal(): number {

    return this.cart.reduce(
      (sum, item) =>
        sum + item.total,
      0
    );
  }

  getFinalTotal(): number {

    const subtotal =
      this.getSubtotal();

    const discount =
      this.discountEnabled
      ? this.discountAmount
      : 0;

    return subtotal - discount;
  }

  // ============================
  // GENERATE PDF ONLY
  // ============================
  goToInvoice(): void {

    const subtotal =
      this.getSubtotal();

    const discount =
      this.discountEnabled
      ? this.discountAmount
      : 0;

    const total =
      subtotal - discount;

    // SAVE TEMP DATA
    localStorage.setItem(
      'invoiceData',

      JSON.stringify({

        cart: this.cart,

        subtotal,

        discount,

        total,

        customerName:
          this.customerName
      })
    );

    // OPEN INVOICE TAB
    const invoiceWindow =
      window.open(
        '/invoice',
        '_blank'
      );

    // AUTO DOWNLOAD
    setTimeout(() => {

      invoiceWindow?.postMessage({

        type: 'DOWNLOAD_ONLY'

      }, '*');

    }, 1000);
  }

  // ============================
  // PRINT
  // ============================
  printInvoice(): void {

    const subtotal =
      this.getSubtotal();

    const discount =
      this.discountEnabled
      ? this.discountAmount
      : 0;

    const total =
      subtotal - discount;

    this.router.navigate([
      '/invoice'
    ], {

      state: {

        cart: this.cart,

        subtotal,

        discount,

        total,

        customerName:
          this.customerName,

        autoPrint: true
      }
    });
  }

  // ============================
  // TRACK BY
  // ============================
  trackByMedicine(
    index: number,
    med: any
  ): any {

    return med?.id ?? index;
  }
}