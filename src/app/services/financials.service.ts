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
      'Authorization': 'YOUR_BEARER_HERE'
    })
  }

  // getAuthentication (user: LogginModel) {
  //   return this.http.get(this.apiUrl, this.apiHeader);
  // }

  // return this.http.get(`${this.apiUrl}/login`, { this.reqOptions, JSON.stringify(user) })
  //   .subscribe(observer => (
  //     observer.
  // ));

  createBill (financial: Financial) {
    return this.http.post(this.apiUrl, financial, this.apiHeader);
  }

  getBillsList (month: number, year: number, description: string) {
    return this.http.get(`${this.apiUrl}/${month}/${year}/${description}`, this.apiHeader)
  }

}