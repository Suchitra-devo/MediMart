import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ApiService }
from '../../services/api.service';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CommonModule }
from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],

  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  errorMessage = '';

  hidePassword = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.loginForm =
      this.fb.group({

      username: [
        '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });
  }

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.api
      .login(this.loginForm.value)
      .subscribe({

      next: (res: any) => {

        // =========================
        // SAVE LOGIN DETAILS
        // =========================

        localStorage.setItem(
          'role',
          res.role
        );

        localStorage.setItem(
          'isLoggedIn',
          'true'
        );

        localStorage.setItem(
          'username',
          this.loginForm.value.username
        );

        // =========================
        // ROLE BASED ROUTING
        // =========================

        if (res.role === 'ADMIN') {

          this.router.navigate(['/admin']);

        }
        else if (res.role === 'CASHIER') {

          this.router.navigate(['/cashier']);

        }
        else {

          this.router.navigate(['/customer']);
        }
      },

      error: () => {

        this.errorMessage =
          "Invalid Credentials";
      }
    });
  }
}