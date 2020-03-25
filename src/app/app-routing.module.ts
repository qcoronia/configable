import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


export const defaultRoutes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(defaultRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
