import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './configuration/config.service';
import { HttpClientModule } from '@angular/common/http';
import { AppStateService } from './app-state/app-state.service';
import { ApiService } from './api/api.service';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    ConfigService,
    AppStateService,
    ApiService,
    AuthService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ConfigService,
    AppStateService,
    ApiService,
    AuthService,
  ]
})
export class CoreModule { }
