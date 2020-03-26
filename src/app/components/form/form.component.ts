import { Component, OnInit } from '@angular/core';
import { FormConfigInterface } from 'src/app/models';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public $formConfig: ReplaySubject<FormConfigInterface>;
  public $data: ReplaySubject<FormData>;

  constructor(
    private route: ActivatedRoute) {
    this.$formConfig = new ReplaySubject<FormConfigInterface>(1);
    this.$formConfig.next(this.route.snapshot.data as FormConfigInterface);
    this.$data = new ReplaySubject<FormData>(1);
  }

  ngOnInit() {
  }

}

export class FormData {
  [key: string]: any;
}
