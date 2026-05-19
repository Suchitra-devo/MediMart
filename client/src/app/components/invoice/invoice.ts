import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.html',
  styleUrls: ['./invoice.css']
})
export class InvoiceComponent {

  cart: any[] = [];
  date = new Date();

  invoiceNo = 'INV-' + Math.floor(Math.random() * 1000000);

  // DISCOUNT CONTROL
  discountEnabled = false;
  discountInput = 0;

  // BILL VALUES
  subtotal = 0;
  discountAmount = 0;
  total = 0;

  constructor() {
    const nav = history.state;

    this.cart = nav.cart || [];
    this.calculateBill();
  }

  // MAIN CALCULATION
  calculateBill() {

    this.subtotal = this.cart.reduce(
      (sum, item) => sum + item.total,
      0
    );

    // APPLY DISCOUNT ONLY IF ENABLED
    if (this.discountEnabled && this.discountInput > 0) {
      this.discountAmount = this.discountInput;
    } else {
      this.discountAmount = 0;
    }

    this.total = this.subtotal - this.discountAmount;
  }

  // TOGGLE DISCOUNT
  toggleDiscount() {

    if (!this.discountEnabled) {
      this.discountInput = 0;
      this.discountAmount = 0;
    }

    this.calculateBill();
  }

  printInvoice() {
    window.print();
  }
}