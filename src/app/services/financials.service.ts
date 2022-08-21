import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Financial } from '../models/financial.model'

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer HASUAHSAUSASHAUSHUAHSUAH'
    })
  }

  addNewBill (financial: Financial) {
    return this.http.post(this.apiUrl, financial, this.apiHeader);
  }

  getBillsList (month: number, year: number, description: string) {
    return this.http.get(`${this.apiUrl}/${month}/${year}/${description}`, this.apiHeader)
  }

}