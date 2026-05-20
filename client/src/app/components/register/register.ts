import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule }
from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import { ApiService }
from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],

  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  errorMessage = '';

  hidePassword = true;

  hideConfirmPassword = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.registerForm =
      this.fb.group({

      

      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      email: [
        '',
        Validators.email
      ],

      address: [''],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ],

      role: ['CUSTOMER']

    },
    {
      validators:
        this.passwordMatchValidator
    });
  }

  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {

    const password =
      form.get('password')?.value;

    const confirmPassword =
      form.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  register() {

    if (this.registerForm.invalid) {

      this.registerForm
        .markAllAsTouched();

      return;
    }

    const payload = {

      

      username:
        this.registerForm.value.username,

      phone:
        this.registerForm.value.phone,

      email:
        this.registerForm.value.email,

      address:
        this.registerForm.value.address,

      password:
        this.registerForm.value.password,

      role:
        this.registerForm.value.role
    };

    this.api
      .register(payload)
      .subscribe({

      next: () => {

        alert(
          "Registration Successful"
        );

        this.router.navigate(['/login']);
      },

      error: (err: any) => {

        console.log(err);

        this.errorMessage =
          "Registration Failed";
      }
    });
  }
}