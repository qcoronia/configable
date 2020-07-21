import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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

  public submitForm() {
    this.authService.logIn(this.form.getRawValue()).pipe(
      take(1),
    ).subscribe(isLoggedIn => this.router.navigate(['/']));
  }

}
