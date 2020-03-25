import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [LeftNavComponent, FooterComponent, HeaderComponent, HeaderMobileComponent, ContentComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [LeftNavComponent, FooterComponent, HeaderComponent, HeaderMobileComponent, ContentComponent],
})
export class SharedModule { }
