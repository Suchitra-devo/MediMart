import { Routes } from '@angular/router';
import { MedicineManagementComponent } from './components/medicine-management/medicine-management';
import { ViewMedicineComponent } from './components/view-medicine/view-medicine';
import { AddMedicineComponent } from './components/add-medicine/add-medicine';
import { EditMedicineComponent } from './components/edit-medicine/edit-medicine';
import { InvoiceComponent } from './components/invoice/invoice';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login')
      .then(m => m.LoginComponent)
  },

  {
  path: 'invoice',
  component: InvoiceComponent
},

  {
  path: 'medicine/:id',
  component: ViewMedicineComponent
  },

  {
  path: 'edit-medicine/:id',
  component: EditMedicineComponent
},

  {
    
  path: 'register',
  loadComponent: () =>
    import('./components/register/register')
      .then(m => m.RegisterComponent)

  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard')
      .then(m => m.AdminDashboardComponent)
  },

  {
    path: 'cashier',
    loadComponent: () =>
      import('./components/cashier-dashboard/cashier-dashboard')
      .then(m => m.CashierDashboardComponent)
  },

  {
    path: 'customer',
    loadComponent: () =>
      import('./components/customer-dashboard/customer-dashboard')
      .then(m => m.CustomerDashboardComponent)
  },

  {
    path: 'medicine-management',
    loadComponent: () =>
      import('./components/medicine-management/medicine-management')
      .then(m => m.MedicineManagementComponent)
  },




  {
    path: 'add-medicine',
    component: AddMedicineComponent
  }

];