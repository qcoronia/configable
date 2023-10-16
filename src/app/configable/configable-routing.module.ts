import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';


const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MonacoEditorModule,
  ],
  exports: [RouterModule]
})
export class ConfigableRoutingModule { }
