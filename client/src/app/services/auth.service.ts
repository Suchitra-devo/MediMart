import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(data:any) {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      data
    );
  }

  register(data:any) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      data
    );
  }

  getMedicines() {
    return this.http.get(
      `${this.baseUrl}/admin/medicine`
    );
  }

  addMedicine(data:any) {
    return this.http.post(
      `${this.baseUrl}/admin/medicine`,
      data
    );
  }
}