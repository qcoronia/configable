import { Component } from '@angular/core';
import { ConfigService } from '../core/configuration/config.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private configService: ConfigService) {
  }

  public async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const configContent = await file.text();
    this.configService.load(configContent);
  }

  public loadSampleConfig() {
    this.configService.loadFromUrl('assets/config.json');
  }
}
