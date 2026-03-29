import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = "";
  password = "";
  message = "";

  constructor(private http: HttpClient) {}

  login() {

    const data = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/api/login', data)
      .subscribe({
        next: (res) => this.message = res.message,
        error: () => this.message = "Error connecting to server"
      });
  }
  @Output() registerClick = new EventEmitter<void>();

goToRegister() {
  this.registerClick.emit();
}
}