import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { ConfigInterface } from '../models/config.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configSource$: ReplaySubject<string>;
  public config$: Observable<ConfigInterface>;

  constructor(
    private http: HttpClient
  ) {
    this.configSource$ = new ReplaySubject<string>(1);
    this.config$ = this.configSource$.pipe(
      distinctUntilChanged(),
      map(configSource => JSON.parse(configSource) as ConfigInterface),
    );
  }

  public load(config: string) {
    localStorage.setItem('config', config);
    this.configSource$.next(config);
  }

  public reload() {
    const config = localStorage.getItem('config');
    this.load(config);
  }

  public loadFromUrl(url: string) {
    this.http.get<ConfigInterface>(url, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      map(res => res.body),
      take(1),
    ).subscribe(body => this.load(JSON.stringify(body)));
  }
}
