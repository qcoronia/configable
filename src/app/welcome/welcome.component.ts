import { Component } from '@angular/core';
import { ConfigService } from '../core/configuration/config.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public loadFromUrlForm: FormGroup;

  constructor(private configService: ConfigService, private formBuilder: FormBuilder) {
    this.loadFromUrlForm = this.formBuilder.group({
      url: ['']
    });
  }

  public async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const configContent = await file.text();
    this.configService.load(configContent);
  }

  public loadJsonFromUrl() {
    const url = this.loadFromUrlForm.get('url')?.value;
    this.configService.loadFromUrl(url);
  }

  public loadSampleConfig() {
    this.configService.loadFromUrl('assets/config.json');
  }
}
