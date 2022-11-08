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
  };

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

  /**
   * Get bills that is near to overdue (not yet)
   * @returns Function
   */
  getBillsCloseToOverdue () {
    return this.http.get(`${this.apiUrl}/bill/close-to-overdue`, this.apiHeader);
  }

  /**
   * Get bills by state: is payed or not
   * @param bearer Authorization from login
   * @param billPayed False or True
   * @returns Function
   */
  getBillByPayed (bearer: String, billPayed: Boolean = false) {
    this.updateHeaders();
    return this.http.get(`${this.apiUrl}/bill/payed/${billPayed}`, this.apiHeader);
  }

  /**
   * Pay a bill that already overdue
   * @param id Bill id
   * @returns Function
   */
  payBillOverdue (id: any) {
    this.updateHeaders();
    return this.http.put(`${this.apiUrl}/bill/pay/${id}`, null, this.apiHeader);
  }

  /**
   * Update the headers for requests
   * @param bearer Authorization bearer
   */
  updateHeaders (bearer: string = '') {
    this.apiHeader = null;
    this.apiHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer.toString() || localStorage.getItem('userBearerKey')
      })
    };
  }
}