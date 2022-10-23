import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FinancialModel } from 'src/app/models/financial.model';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userBearerKey')
    })
  }

  getBills (month?: number, year?: number, description?: string, tag?: string) {
    let query: String = '';
    if (month != undefined) query += `month=${month}&`;
    if (year != undefined) query += `year=${year}&`;
    if (description != undefined) query += `description=${description}&`;
    if (tag != undefined) query += `tag=${tag}&`;

    query = query.endsWith("&") ? query.substring(0, query.lastIndexOf('&')) : query
    return this.http.get(`${this.apiUrl}/bill/list${query != '' ? '?' + query : ''}`, this.apiHeader)
  }

  createBill (financial: FinancialModel) {
    return this.http.post(`${this.apiUrl}/bill/new`, financial, this.apiHeader);
  }

  updateBill (financial: FinancialModel) {
    return this.http.post(`${this.apiUrl}/bill/update/${financial.id}`, financial, this.apiHeader);
  }

  deleteBill (id: any) {
    return this.http.delete(`${this.apiUrl}/bill/delete/${id}`, this.apiHeader);
  }

  getBillByPayed (billPayed: Boolean = false) {
    this.getNewBearer();
    return this.http.get(`${this.apiUrl}/bill/payed/${billPayed}`, this.apiHeader);
  }

  /**
   * Get the new bearer from local storage.
   */
  getNewBearer () {
    this.apiHeader.headers[1] = localStorage.getItem('userBearerKey');
  }
}