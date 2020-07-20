import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';
import { tap, take, timeout, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string;

  constructor(
    private configService: ConfigService,
    private http: HttpClient) {
    this.configService.config$.pipe(
      tap(config => this.apiUrl = config.apiUrl),
      take(1),
    ).subscribe(config => { });
  }

  public get<TResult>(route: string): Observable<TResult> {
    return this.http.get<TResult>(`${this.apiUrl}${route}`, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      retry(3),
    );
  }

  public post<TPayload>(route: string, payload: any): Observable<TPayload> {
    return this.http.post<TPayload>(`${this.apiUrl}${route}`, payload, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      retry(3),
    );
  }

  public put<TPayload>(route: string, payload: any): Observable<TPayload> {
    return this.http.put<TPayload>(`${this.apiUrl}${route}`, payload, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      retry(3),
    );
  }

  public delete(route: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${route}`, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      retry(3),
    );
  }
}
