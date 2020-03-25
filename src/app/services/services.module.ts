import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigProviderService } from './config-provider.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        ConfigProviderService,
      ],
    };
  }
}
