import { Component, OnInit } from '@angular/core';
import { FormInterface } from '../core/models/form.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateService } from '../core/app-state/app-state.service';
import { ApiService } from '../core/api/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, take, switchMap, delay } from 'rxjs/operators';
import { of, iif, from } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public isCreateMode: boolean;

  public formConfig: FormInterface;

  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appStateService: AppStateService,
    private api: ApiService,
    private formBuilder: FormBuilder) {
    this.isCreateMode = true;

    this.formConfig = this.route.snapshot.data as FormInterface;
    this.appStateService.set({
      headerName: this.formConfig.formName,
    });

    const formSchema = {};
    for (var formControl of this.formConfig.formControls) {
      formSchema[formControl.alias] = [null];
    }

    this.form = this.formBuilder.group(formSchema);

    if (!this.isCreateMode) {
      for (var formControl of this.formConfig.formControls.filter(e => e.isReadOnly)) {
        this.form.get(formControl.alias).disable();
      }
    }
  }

  ngOnInit(): void {
    if (!this.route.snapshot.params.id) {
      return;
    }

    this.isCreateMode = false;

    const dataSourceUrl = this.formConfig.dataSourceUrl
      .replace(`{${this.formConfig.idAlias}}`, this.route.snapshot.params.id);
    this.api.get<FormData>(dataSourceUrl).pipe(
      tap(data => this.form.patchValue(data)),
      take(1),
    ).subscribe(data => { });
  }

  public submitForm() {
    of(this.form.getRawValue()).pipe(
      switchMap(formValue => {
        if (this.isCreateMode) {
          return this.api.post(this.formConfig.createUrl, formValue);
        } else {
          return this.api.put(this.formConfig.updateUrl
            .replace(`{${this.formConfig.idAlias}}`, this.route.snapshot.params.id), formValue);
        }
      }),
      take(1),
    ).subscribe(res => this.router.navigate(['../list'], { relativeTo: this.route }));
  }

}

export class FormData {
  [key: string]: any;
}
