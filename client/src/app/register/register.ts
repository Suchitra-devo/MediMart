import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  // 🔹 Form Fields
  firstName = "";
  lastName = "";
  phone = "";
  email = "";
  address = "";
  password = "";
  confirmPassword = "";

  // 🔹 Messages
  message = "";
  status = "";

  // 🔹 Field Errors
  phoneError = "";
  emailError = "";
  passwordError = "";

  // 🔹 Navigation Event
  @Output() loginClick = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  // 🔸 Phone Validation
  validatePhone() {
    if (this.phone && !/^[0-9]+$/.test(this.phone)) {
      this.phoneError = "Only numbers allowed";
    } else {
      this.phoneError = "";
    }
  }

  // 🔸 Email Validation
  validateEmail() {
    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.emailError = "Invalid email format";
    } else {
      this.emailError = "";
    }
  }

  // 🔸 Password Match Validation
  validatePasswordMatch() {
    if (this.password !== this.confirmPassword) {
      this.passwordError = "Passwords do not match";
    } else {
      this.passwordError = "";
    }
  }

  // 🔸 Register Function
  register() {

    // Run validations again before submit
    this.validatePhone();
    this.validateEmail();
    this.validatePasswordMatch();

    // Stop if errors exist
    if (this.phoneError || this.emailError || this.passwordError) {
      this.status = "FAILED";
      this.message = "Please fix errors above";
      return;
    }

    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      address: this.address,
      password: this.password
    };

    console.log("Sending:", data);

    this.http.post<any>('http://localhost:8081/api/register', data)
      .subscribe({
        next: (res) => {
          this.status = res.status;

          if (res.status === "SUCCESS") {
            this.message = `Welcome ${this.firstName} ${this.lastName}, Your username is "${this.firstName}".`;
          } else {
            this.message = res.message;
          }
        },
        error: (err) => {
          console.log(err);
          this.status = "FAILED";
          this.message = "Error connecting to server";
        }
      });
  }

  // 🔸 Navigate back to login
  goToLogin() {
    this.loginClick.emit();
  }
}