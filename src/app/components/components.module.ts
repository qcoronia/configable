import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [LeftNavComponent, FooterComponent, HeaderComponent, HeaderMobileComponent, ContentComponent, ListComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
  ],
  providers: [],
  entryComponents: [ListComponent, FormComponent],
  exports: [LeftNavComponent, FooterComponent, HeaderComponent, HeaderMobileComponent, ContentComponent, ListComponent, FormComponent],
})
export class ComponentsModule { }
