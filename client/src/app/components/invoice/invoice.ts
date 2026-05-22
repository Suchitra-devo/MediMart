import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.html',
  styleUrls: ['./invoice.css']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('invoiceContent', { static: false })
  invoiceContent!: ElementRef;

  cart: any[] = [];

  date = new Date();

  invoiceNo = 'INV-' + Math.floor(Math.random() * 1000000);

  discountEnabled = false;
  discountInput = 0;

  subtotal = 0;
  discountAmount = 0;
  total = 0;

  customerName = '';
  autoPrint = false;

  constructor() {

    const nav = history.state;

    if (nav?.cart?.length) {

      this.cart = nav.cart || [];
      this.customerName = nav.customerName || 'Walk-in Customer';

      this.calculateBill();
      this.autoPrint = nav.autoPrint || false;
    }

    else {

      const saved = localStorage.getItem('invoiceData');

      if (saved) {

        const data = JSON.parse(saved);

        this.cart = data.cart || [];
        this.customerName = data.customerName || 'Walk-in Customer';

        this.calculateBill();
      }
    }

    window.addEventListener('message', (event) => {

      if (event.data?.type === 'DOWNLOAD_ONLY') {

        setTimeout(() => this.downloadPDF(), 800);
      }
    });
  }

  ngOnInit(): void {

    if (this.autoPrint) {

      setTimeout(() => window.print(), 800);
    }
  }

  // =========================
  // EDIT ORDER FUNCTIONS
  // =========================

  updateQuantity(item: any, qty: number) {

    const value = Number(qty);

    if (value <= 0) {

      this.removeItem(item);
      return;
    }

    item.quantity = value;
    item.total = item.price * item.quantity;

    this.calculateBill();
  }

  removeItem(item: any) {

    this.cart = this.cart.filter(i => i !== item);

    this.calculateBill();
  }

  // =========================
  // BILL CALCULATION
  // =========================

  calculateBill() {

    this.subtotal = this.cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    if (this.discountEnabled && this.discountInput > 0) {
      this.discountAmount = this.discountInput;
    } else {
      this.discountAmount = 0;
    }

    this.total = this.subtotal - this.discountAmount;
  }

  toggleDiscount() {

    if (!this.discountEnabled) {
      this.discountInput = 0;
      this.discountAmount = 0;
      this.calculateBill();
    }
  }

  // =========================
  // PDF
  // =========================

  async downloadPDF() {

    const element = this.invoiceContent.nativeElement;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    const d = new Date();

    const dateStr =
      String(d.getDate()).padStart(2, '0') +
      String(d.getMonth() + 1).padStart(2, '0') +
      d.getFullYear();

    const fileName =
      `${dateStr}_${this.customerName.replace(/\s+/g, '_')}.pdf`;

    pdf.save(fileName);
  }

  printInvoice() {
    window.print();
  }
}