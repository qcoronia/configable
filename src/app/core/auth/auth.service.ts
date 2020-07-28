import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { take, tap, timeout, retry, switchMap, catchError } from 'rxjs/operators';
import { Session } from 'protractor';
import { AppStateService } from '../app-state/app-state.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$: ReplaySubject<boolean>;
  public userDisplayName$: ReplaySubject<string>;

  private authUrl: string;
  private authEntity: string;

  constructor(
    private configService: ConfigService,
    private appStateService: AppStateService,
    private http: HttpClient) {
    this.isLoggedIn$ = new ReplaySubject<boolean>();
    this.userDisplayName$ = new ReplaySubject<string>();

    this.configService.config$.pipe(
      tap(config => this.authUrl = config.authUrl),
      tap(config => this.authEntity = config.authEntity),
      take(1),
    ).subscribe(config => { });
    this.isLoggedIn$.next(!!sessionStorage.getItem('username'));
    this.userDisplayName$.next(sessionStorage.getItem('username'));
  }

  public signUp(args: any): Observable<boolean> {
    const url = `${this.authUrl}/${this.authEntity}?username=${encodeURIComponent(args.username)}&password=${encodeURIComponent(args.password)}`;
    return this.http.get<User[]>(url, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      retry(3),
      switchMap(users => {
        const alreadyExists = users.length > 0;
        if (alreadyExists) {
          const body = {
            username: args.username,
            password: args.password,
          } as Partial<User>;
          return this.http.post<User>(`${this.authUrl}/${this.authEntity}`, body).pipe(
            catchError(err => of(false)),
            switchMap(newUser => of(true)),
          );
        } else {
          return of (alreadyExists)
        }
      }),
      tap(user => {
        sessionStorage.setItem('username', args.username);
        this.isLoggedIn$.next(true);
        this.userDisplayName$.next(args.username);
      })
    );
  }

  public logIn(args: any): Observable<boolean> {
    const url = `${this.authUrl}/${this.authEntity}?username=${encodeURIComponent(args.username)}&password=${encodeURIComponent(args.password)}`;
    console.warn(url);
    return this.http.get<User[]>(url, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      timeout(3000),
      retry(3),
      switchMap(users => {
        if (users.length > 0) {
          sessionStorage.setItem('username', args.username);
          this.isLoggedIn$.next(true);
          this.userDisplayName$.next(args.username);
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  public logout(): Observable<boolean> {
    sessionStorage.removeItem('username');
    this.isLoggedIn$.next(false);
    this.userDisplayName$.next('');
    this.appStateService.set({ headerName: '' });
    return of(true);
  }
}
