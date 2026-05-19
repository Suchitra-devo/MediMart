import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],

  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  formData: any = {

    username: '',
    password: '',
    role: 'CUSTOMER'
  };

  errorMessage = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  register() {

    this.api.register(this.formData).subscribe({

      next: (res: any) => {

        alert("Registration Successful");

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