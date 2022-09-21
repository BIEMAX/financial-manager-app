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

  createBill (financial: FinancialModel) {
    return this.http.post(`${this.apiUrl}/bill/new`, financial, this.apiHeader);
  }

  getBills (month?: number, year?: number, description?: string) {
    let query: String = '';
    if (month != undefined) query += `month=${month}&`;
    if (year != undefined) query += `year=${year}&`;
    if (description != undefined) query += `description=${description}&`;

    query = query.endsWith("&") ? query.substring(0, query.lastIndexOf('&')) : query
    return this.http.get(`${this.apiUrl}/bill/list${query != '' ? '?' + query : ''}`, this.apiHeader)
  }

  deleteBill (id: any) {
    return this.http.delete(`${this.apiUrl}/bill/delete/${id}`, this.apiHeader);
  }
}