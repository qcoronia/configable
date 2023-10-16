import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, iif, merge } from 'rxjs';
import { ConfigInterface } from '../models/config.interface';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, shareReplay, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConfigData } from '../models/config-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configId$: ReplaySubject<string> = new ReplaySubject<string>(1);
  public config$: Observable<ConfigInterface>;

  public allConfigs$: Observable<ConfigData[]>;
  public allConfigIds$: Observable<string[]>;

  public defaultConfig$: Observable<ConfigInterface>;

  constructor(
    private http: HttpClient,
    private dbService: NgxIndexedDBService,
    private snackbar: MatSnackBar,
  ) {
    this.config$ = new ReplaySubject<ConfigInterface>(1);

    const fetchDefaultConfig$ = this.http.get<ConfigInterface>('assets/config.json', {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      map(res => res.body),
      shareReplay(1),
    );

    const storeDefaultConfig$ = fetchDefaultConfig$.pipe(
      switchMap(defaultConfig => this.dbService.add<ConfigData>('config', {
        id: 'default',
        content: JSON.stringify(defaultConfig)
      }))
    );

    this.defaultConfig$ = this.dbService.getByID<ConfigData>('config', 'default').pipe(
      switchMap(configData => {
        if (!!configData) {
          return of(configData);
        } else {
          return storeDefaultConfig$;
        }
      }),
      map(configData => JSON.parse(configData.content) as ConfigInterface),
      take(1),
      shareReplay(1),
    );

    this.config$ = this.configId$.pipe(
      switchMap(configId => this.dbService.getByID<ConfigData>('config', configId)),
      switchMap(configData => {
        if (!!configData) {
          return of(JSON.parse(configData.content) as ConfigInterface);
        } else {
          return this.defaultConfig$;
        }
      }),
      tap(config => this.snackbar.open(`Loaded "${config.appName}"`, 'Dismiss', { duration: 3000 })),
    );

    this.allConfigs$ = this.dbService.getAll<ConfigData>('config');
    this.allConfigIds$ = this.allConfigs$.pipe(
      map(configs => configs.map(config => config.id)),
    )

    this.load();
  }

  private load() {
    const configId = localStorage.getItem('currentConfig');
    if (!configId) {
      localStorage.setItem('currentConfig', 'default');
    }

    this.configId$.next(localStorage.getItem('currentConfig'));
  }

  public reload() {
    this.load();
  }

  public applyConfig(configId: string) {
    localStorage.setItem('currentConfig', configId);
    this.load();
  }

  public createConfig(configId: string, content: string) {
    return this.dbService.add<ConfigData>('config', {
      id: configId,
      content,
    }).pipe(
      take(1),
    );
  }

  public updateConfig(configId: string, content: string) {
    return this.dbService.update<ConfigData>('config', {
      id: configId,
      content,
    }).pipe(
      take(1),
      withLatestFrom(this.configId$),
      tap(([_, currentConfigId]) => {
        if (configId === currentConfigId) {
          this.load();
        }
      }),
      map(([configData, _]) => configData),
    );
  }


  public deleteConfig(configId: string) {
    return this.dbService.delete('config', configId).pipe(
      take(1),
      withLatestFrom(this.configId$),
      tap(([_, currentConfigId]) => {
        if (configId === currentConfigId) {
          this.applyConfig('default');
        }
      }),
      map(([deleteResponse, _]) => deleteResponse),
    );
  }
}
