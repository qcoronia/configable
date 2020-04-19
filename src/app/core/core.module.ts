import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './configuration/config.service';
import { HttpClientModule } from '@angular/common/http';
import { AppStateService } from './app-state/app-state.service';
import { ApiService } from './api/api.service';


@NgModule({
  declarations: [
    ConfigService,
    AppStateService,
    ApiService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ConfigService,
    AppStateService,
    ApiService
  ]
})
export class CoreModule { }
