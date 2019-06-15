import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  public headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.headers = new HttpHeaders().set('Content-Type', 'text/plain');
   }

   protected get(url: string, params: {} | undefined): Observable<any> {
     return this.http.get(url, {params, headers: this.headers});
   }

   protected post(url: string, body: {}): Observable<any> {
    return this.http.post(url, body, { headers: this.headers });
  }

  protected put(url: string, body: {}): Observable<any> {
    return this.http.put(url, body, { headers: this.headers });
  }

  protected delete(url: string, params: {} | undefined): Observable<any> {
    return this.http.delete(url, {params, headers: this.headers});
  }


}
