import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from './configuration/config.service';


@NgModule({
  declarations: [
    ConfigService,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConfigService,
  ],
})
export class CoreModule { }
