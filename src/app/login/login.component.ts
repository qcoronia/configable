import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { take, tap } from 'rxjs/operators';
import { DialogComponent, DialogData } from '../core/components/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: UntypedFormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog) {
    this.form = formBuilder.group({
      username: [null],
      password: [null],
    });
  }

  public submitForm() {
    this.authService.logIn(this.form.getRawValue()).pipe(
      take(1),
    ).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      } else {
        this.dialog.open(DialogComponent, {
          data: {
            message: 'Invalid username or password.',
          } as DialogData,
        });
      }
    });
  }

}
