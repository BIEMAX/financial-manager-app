import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('userBearerKey')
    })
  }

  getChartsList () {
    return this.http.get(`${this.apiUrl}/charts/user/access`, this.apiHeader)
  }

  getBillsByMonth (month: number, year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/${month}/${year}`, this.apiHeader);
  }

  getBillsByYear (year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/${year}`, this.apiHeader);
  }

  getBillsOutgoingByMonth (month: number, year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/outgoing/${month}/${year}`, this.apiHeader);
  }
}