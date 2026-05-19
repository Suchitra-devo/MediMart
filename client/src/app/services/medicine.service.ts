import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private apiUrl =
    'http://localhost:8080/api/medicines';

  constructor(private http: HttpClient) {}

  // GET ALL
  getAllMedicines(): Observable<any> {

    return this.http.get(this.apiUrl);
  }

  // GET BY ID
getMedicineById(id: number) {

  return this.http.get(
    `${this.apiUrl}/${id}`
  );
}


  // ADD
addMedicine(medicine: any) {

  return this.http.post(
    this.apiUrl,
    medicine
  );
}

//update
updateMedicine(id: number, medicine: any) {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    medicine
  );
}



  // DELETE
  deleteMedicine(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}