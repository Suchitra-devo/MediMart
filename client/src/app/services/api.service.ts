import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // 1. Added this import

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // This is the missing method that was causing the 'ng serve' error
  getMedicines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/medicines`);
  }

  login(data: any) {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      data
    );
  }

  register(data: any) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      data
    );
  }
}