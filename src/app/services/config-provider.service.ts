import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigInterface } from '../models';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigProviderService {

  public $config: ReplaySubject<ConfigInterface>;

  constructor(private http: HttpClient) {
    this.$config = new ReplaySubject<ConfigInterface>(1);
    this.http.get<ConfigInterface>(`assets/configs/default.json`).pipe(
      tap(res => this.$config.next(res))
    ).subscribe(res => { });
  }


}
