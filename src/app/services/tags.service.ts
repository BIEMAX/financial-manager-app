import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('userBearerKey')
    })
  };

  getTags () {
    return this.http.get(`${this.apiUrl}/tag/list`, this.apiHeader);
  }

  newTag (tagName: string) {
    return this.http.post(`${this.apiUrl}/tag/new`, { name: tagName }, this.apiHeader);
  }

  deleteTag (name: string) {
    return this.http.delete(`${this.apiUrl}/tag/delete/${name.trim()}`, this.apiHeader);
  }

}