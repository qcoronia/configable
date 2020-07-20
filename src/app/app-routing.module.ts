import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SigninComponent },
];

const routeOptions: ExtraOptions = {
  initialNavigation: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routeOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
