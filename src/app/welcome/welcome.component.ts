import { Component, HostListener } from '@angular/core';
import { ConfigService } from '../core/configuration/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private configService: ConfigService, private matSnackBar: MatSnackBar) {
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

  @HostListener('paste', ['$event'])
  public onPaste(event: any) {
    const text = event.clipboardData.getData('text/plain');
    if (text.startsWith('{')) {
      this.configService.load(text);
    } else if (text.startsWith('[')) {
      this.matSnackBar.open('Invalid configuration: Expecting a JSON object', 'Dismiss', { duration: 5000 });
    } else if (text.startsWith('http')) {
      this.configService.loadFromUrl(text);
    }
  }
}
