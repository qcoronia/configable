import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './configuration/config.service';
import { HttpClientModule } from '@angular/common/http';
import { AppStateService } from './app-state/app-state.service';


@NgModule({
  declarations: [
    ConfigService,
    AppStateService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ConfigService,
    AppStateService
  ],
})
export class CoreModule { }
