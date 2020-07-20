import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { take, tap } from 'rxjs/operators';

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
  }
}
