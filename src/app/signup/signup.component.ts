import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { distinctUntilChanged, takeWhile, skipWhile, take, tap } from 'rxjs/operators';
import { RoutingService } from '../core/routing/routing.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
    this.authService.signUp(this.form.getRawValue()).pipe(
      take(1),
    ).subscribe(isSignedUp => this.router.navigate(['/']));
  }

}
