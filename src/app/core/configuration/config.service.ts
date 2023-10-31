import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject, of } from 'rxjs';
import { ConfigInterface } from '../models/config.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { ConfigValidationResult } from '../models/config-validation-result.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONFIG_SCHEMA } from '../models/config-schema';
import { Draft04 } from 'json-schema-library';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configSource$: ReplaySubject<string>;
  public config$: Observable<ConfigInterface>;

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) {
    this.configSource$ = new ReplaySubject<string>(1);
    this.config$ = this.configSource$.pipe(
      distinctUntilChanged(),
      map(configSource => JSON.parse(configSource) as ConfigInterface),
    );
  }

  public load(config: string) {
    this.validate(config).pipe(
      take(1),
      tap(validationResult => {
        if (!validationResult.isValid) {
          this.matSnackBar.open(`Invalid configuration: '${validationResult.errors}'`, 'Dismiss', { duration: 5000 });
        }
      }),
      filter(validationResult => validationResult.isValid),
    ).subscribe(validationResult => {
      localStorage.setItem('config', config);
      this.configSource$.next(config);
    });
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

  public validate(json: string): Observable<ConfigValidationResult> {
    return of(CONFIG_SCHEMA).pipe(
      map(schema => {
        const jsonSchema = new Draft04(schema);
        const data = JSON.parse(json);
        const errors = jsonSchema.validate(data);
        return {
          isValid: errors.length <= 0,
          errors: errors.map(e => e.message).join('\n')
        } as ConfigValidationResult;
      }),
      take(1)
    );
  }
}
