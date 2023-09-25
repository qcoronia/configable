import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';



@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [DialogComponent],
})
export class ComponentsModule { }
