import { Component } from '@angular/core';
import { ConfigService } from './core/configuration/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'configable';

  public theme: string = localStorage.getItem('theme') || this.getPreferredColorScheme();

  constructor(private configService: ConfigService) {
    let configUrl = localStorage.getItem('config');
    if (!!configUrl) {
      this.configService.load(configUrl);
    }
    
    document.body.classList.add(this.theme);
  }

  public setTheme(theme: string) {
    document.body.classList.remove(this.theme);
    localStorage.setItem('theme', theme);
    this.theme = theme;
    document.body.classList.add(this.theme);
  }
  
  public getPreferredColorScheme() {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      } else {
        return 'light';
      }
    }

    return 'light';
  }

  public unloadConfig() {
    localStorage.removeItem('config');
    window.location.reload();
  }

  public hasConfig(): boolean {
    return localStorage.getItem('config') !== null;
  }
}
