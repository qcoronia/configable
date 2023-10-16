import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/configuration/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public toolbar: FormGroup;
  public editorOptions = { theme: 'vs-dark', language: 'json' };
  public code: string = '';

  public configOptions$ = this.configService.allConfigIds$;

  constructor(private formBuilder: FormBuilder, private configService: ConfigService) {
    this.toolbar = this.formBuilder.group({
      config: [''],
    });

    this.toolbar.patchValue({
      config: localStorage.getItem('currentConfig') || 'default',
    });
  }
}
