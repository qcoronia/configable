import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { take, tap } from 'rxjs/operators';
import { Session } from 'protractor';
import { AppStateService } from '../app-state/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isSignedUp$: ReplaySubject<boolean>;
  public userDisplayName$: ReplaySubject<string>;

  private authUrl: string;

  constructor(
    private configService: ConfigService,
    private appStateService: AppStateService) {
    this.isSignedUp$ = new ReplaySubject<boolean>();
    this.userDisplayName$ = new ReplaySubject<string>();

    this.configService.config$.pipe(
      tap(config => this.authUrl = config.authUrl),
      take(1),
    ).subscribe(config => { });
    this.isSignedUp$.next(!!sessionStorage.getItem('username'));
    this.userDisplayName$.next(sessionStorage.getItem('username'));
  }

  public signUp(args: any): Observable<boolean> {
    sessionStorage.setItem('username', args.username);
    this.isSignedUp$.next(true);
    this.userDisplayName$.next(args.username);
    return of(true);
  }

  public logIn(args: any): Observable<boolean> {
    sessionStorage.setItem('username', args.username);
    this.isSignedUp$.next(true);
    this.userDisplayName$.next(args.username);
    return of(true);
  }

  public logout(): Observable<boolean> {
    sessionStorage.removeItem('username');
    this.isSignedUp$.next(false);
    this.userDisplayName$.next('');
    this.appStateService.set({ headerName: '' });
    return of(true);
  }
}
