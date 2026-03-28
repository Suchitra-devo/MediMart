import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  username: string = "";
  password: string = "";
  message: string = "";

  constructor(private http: HttpClient) {}

  login() {
    console.log("Button clicked");

    const data = {
      username: this.username,
      password: this.password
    };

    console.log("Sending:", data);

    this.http.post<any>('http://localhost:8080/api/login', data)
      .subscribe({
        next: (response) => {
          console.log("SUCCESS:", response);
          this.message = response.message;
        },
        error: (err) => {
          console.log("ERROR:", err);
          this.message = "Error connecting to server";
        }
      });
  }
}