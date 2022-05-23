import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addNewBill () {
    return this.http.post(this.apiUrl, {});
  }

  getBillsList (month: number, year: number, description: string) {
    return this.http.get(`${this.apiUrl}/{month}/{year}/{description}`, this.apiHeader)
  }

}