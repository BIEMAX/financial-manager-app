import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DefaulterModel } from 'src/app/models/defaulter.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultersService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': localStorage.getItem('userBearerKey')
    })
  };

  getDefaulter (name?: string, tag?: string) {
    let query: String = '';
    if (name != undefined) query += `name=${name}&`;
    if (tag != undefined) query += `tag=${tag}&`;

    query = query.endsWith("&") ? query.substring(0, query.lastIndexOf('&')) : query
    return this.http.get(`${this.apiUrl}/defaulters/list${query != '' ? '?' + query : ''}`, this.apiHeader)
  }

  createDefaulter (defaulter: DefaulterModel) {
    return this.http.post(`${this.apiUrl}/defaulters/new`, defaulter, this.apiHeader);
  }

  updateDefaulter (financial: DefaulterModel) {
    return this.http.post(`${this.apiUrl}/defaulters/update/${financial.id}`, financial, this.apiHeader);
  }

  deleteDefaulter (id: any) {
    return this.http.delete(`${this.apiUrl}/defaulters/delete/${id}`, this.apiHeader);
  }
}