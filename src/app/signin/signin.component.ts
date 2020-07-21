import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { distinctUntilChanged, takeWhile, skipWhile, take, tap } from 'rxjs/operators';
import { RoutingService } from '../core/routing/routing.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: [null],
      password: [null],
    });
  }

  ngOnInit(): void {
  }

  public submitForm() {
    this.authService.signIn(this.form.getRawValue()).pipe(
      take(1),
      tap(e => console.warn('navigating from form')),
    ).subscribe(isSignedIn => this.router.navigate(['/']));
  }

}
