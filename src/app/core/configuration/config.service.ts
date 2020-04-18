import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { ConfigInterface } from '../models/config.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configSource$: Observable<ConfigInterface>;
  public config$: ReplaySubject<ConfigInterface>;

  constructor(
    private http: HttpClient
  ) {
    this.config$ = new ReplaySubject<ConfigInterface>(1);
    this.configSource$ = this.http.get<ConfigInterface>('assets/config.json', {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      map(res => res.body),
      tap(body => this.config$.next(body)),
    );

    this.load();
  }

  private load() {
    this.configSource$.pipe(
      take(1),
    ).subscribe(res => { });
  }

  public reload() {
    this.load();
  }
}
