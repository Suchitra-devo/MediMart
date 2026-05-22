import {
  Component,
  OnInit
}
from '@angular/core';

import {
  CommonModule
}
from '@angular/common';

import {
  FormsModule
}
from '@angular/forms';

import {
  AppHeaderComponent
}
from '../app-header/app-header';

@Component({
  selector: 'app-sales-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AppHeaderComponent
  ],

  templateUrl: './sales-dashboard.html',

  styleUrls: ['./sales-dashboard.css']
})
export class SalesDashboardComponent
implements OnInit {

  searchText = '';

  totalSales = 0;

  totalInvoices = 0;

  todaySales = 0;

  invoices: any[] = [];

  filteredInvoices: any[] = [];

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.loadDummyInvoices();
  }

  // =========================
  // DUMMY DATA
  // =========================

  loadDummyInvoices(): void {

    this.invoices = [

      {
        invoiceNo: 'INV-1001',
        customer: 'Arun',
        amount: 540,
        date: '2026-05-20'
      },

      {
        invoiceNo: 'INV-1002',
        customer: 'Priya',
        amount: 1250,
        date: '2026-05-20'
      },

      {
        invoiceNo: 'INV-1003',
        customer: 'Karthik',
        amount: 320,
        date: '2026-05-21'
      },

      {
        invoiceNo: 'INV-1004',
        customer: 'Meena',
        amount: 860,
        date: '2026-05-22'
      },

      {
        invoiceNo: 'INV-1005',
        customer: 'Rahul',
        amount: 1420,
        date: '2026-05-22'
      }
    ];

    this.filteredInvoices =
      [...this.invoices];

    // TOTAL SALES
    this.totalSales =
      this.invoices.reduce(
        (sum, invoice) =>
          sum + invoice.amount,
        0
      );

    // TOTAL INVOICES
    this.totalInvoices =
      this.invoices.length;

    // TODAY SALES
    this.todaySales =
      this.invoices
        .filter(
          invoice =>
            invoice.date === '2026-05-22'
        )
        .reduce(
          (sum, invoice) =>
            sum + invoice.amount,
          0
        );
  }

  // =========================
  // SEARCH
  // =========================

  applyFilter(): void {

    const text =
      this.searchText
        .toLowerCase()
        .trim();

    if (!text) {

      this.filteredInvoices =
        [...this.invoices];

      return;
    }

    this.filteredInvoices =
      this.invoices.filter(invoice =>

        invoice.invoiceNo
          .toLowerCase()
          .includes(text)

        ||

        invoice.customer
          .toLowerCase()
          .includes(text)
      );
  }
}