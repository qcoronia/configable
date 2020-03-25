import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigProviderService } from './config-provider.service';



@NgModule({
  declarations: [ConfigProviderService],
  imports: [
    CommonModule
  ],
  exports: [ConfigProviderService]
})
export class ServicesModule { }
