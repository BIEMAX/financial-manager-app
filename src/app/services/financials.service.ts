import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FinancialModel } from '../models/financial.model'

@Injectable({
  providedIn: 'root'
})
export class FinancialsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('userBearerKey')
    })
  }

  // getAuthentication (user: LogginModel) {
  //   return this.http.get(this.apiUrl, this.apiHeader);
  // }

  // return this.http.get(`${this.apiUrl}/login`, { this.reqOptions, JSON.stringify(user) })
  //   .subscribe(observer => (
  //     observer.
  // ));

  createBill (financial: FinancialModel) {
    return this.http.post(`${this.apiUrl}/bill/new`, financial, this.apiHeader);
  }

  getBillsList (month: number, year: number, description: string) {
    return this.http.get(`${this.apiUrl}/${month}/${year}/${description}`, this.apiHeader)
  }

}