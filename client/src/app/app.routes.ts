import { Routes } from '@angular/router';

import { AuthGuard }
from './services/auth.guard';

import { LandingPageComponent }
from './components/landing-page/landing-page';

import { MedicineManagementComponent }
from './components/medicine-management/medicine-management';

import { ViewMedicineComponent }
from './components/view-medicine/view-medicine';

import { AddMedicineComponent }
from './components/add-medicine/add-medicine';

import { EditMedicineComponent }
from './components/edit-medicine/edit-medicine';

import { InvoiceComponent }
from './components/invoice/invoice';

export const routes: Routes = [

  /* LANDING PAGE */
  {
    path: '',
    component: LandingPageComponent
  },

  /* LOGIN */
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login')
      .then(m => m.LoginComponent)
  },

  /* REGISTER */
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register')
      .then(m => m.RegisterComponent)
  },

  /* ADMIN */
  {
    path: 'admin',
    canActivate: [AuthGuard],

    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard')
      .then(m => m.AdminDashboardComponent)
  },

  /* CASHIER */
  {
    path: 'cashier',
    canActivate: [AuthGuard],

    loadComponent: () =>
      import('./components/cashier-dashboard/cashier-dashboard')
      .then(m => m.CashierDashboardComponent)
  },

  /* CUSTOMER */
  {
    path: 'customer',
    canActivate: [AuthGuard],

    loadComponent: () =>
      import('./components/customer-dashboard/customer-dashboard')
      .then(m => m.CustomerDashboardComponent)
  },

  /* MEDICINE MANAGEMENT */
  {
    path: 'medicine-management',
    canActivate: [AuthGuard],

    loadComponent: () =>
      import('./components/medicine-management/medicine-management')
      .then(m => m.MedicineManagementComponent)
  },

  /* VIEW MEDICINE */
  {
    path: 'medicine/:id',
    component: ViewMedicineComponent,
    canActivate: [AuthGuard]
  },

  /* EDIT MEDICINE */
  {
    path: 'edit-medicine/:id',
    component: EditMedicineComponent,
    canActivate: [AuthGuard]
  },

  /* ADD MEDICINE */
  {
    path: 'add-medicine',
    component: AddMedicineComponent,
    canActivate: [AuthGuard]
  },

  /* INVOICE */
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },

  /* INVALID ROUTE */
  {
    path: '**',
    redirectTo: ''
  }

];