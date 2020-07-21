import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { take, tap } from 'rxjs/operators';
import { Session } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isSignedIn$: ReplaySubject<boolean>;
  public userDisplayName$: ReplaySubject<string>;

  private authUrl: string;

  constructor(
    private configService: ConfigService) {
    this.isSignedIn$ = new ReplaySubject<boolean>();
    this.userDisplayName$ = new ReplaySubject<string>();

    this.configService.config$.pipe(
      tap(config => this.authUrl = config.authUrl),
      take(1),
    ).subscribe(config => { });
    this.isSignedIn$.next(!!sessionStorage.getItem('username'));
    this.userDisplayName$.next(sessionStorage.getItem('username'));
  }

  public signIn(args: any): Observable<boolean> {
    sessionStorage.setItem('username', args.username);
    this.isSignedIn$.next(true);
    this.userDisplayName$.next(args.username);
    return of(true);
  }

  public logout(): Observable<boolean> {
    sessionStorage.removeItem('username');
    this.isSignedIn$.next(false);
    this.userDisplayName$.next('');
    return of(true);
  }
}
