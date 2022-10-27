import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userBearerKey')
    })
  };

  getAvailableChartByUser () {
    return this.http.get(`${this.apiUrl}/charts/user/access`, this.apiHeader)
  }

  getSumBillsByMonthAndYear (month: number, year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/sum/month/${month}/${year}`, this.apiHeader);
  }

  getSumBillsByYear (year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/sum/year/${year}`, this.apiHeader);
  }

  getMoneySpentByMonth (month: number, year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/money/spent/${month}/${year}`, this.apiHeader);
  }

  getMoneyRemainByMonth (month: number, year: number) {
    return this.http.get(`${this.apiUrl}/charts/bills/money/remain/${month}/${year}`, this.apiHeader);
  }
}