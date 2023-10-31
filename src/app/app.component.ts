import { Component } from '@angular/core';
import { ConfigService } from './core/configuration/config.service';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'configable';

  public theme: string = localStorage.getItem('theme') || 'light';

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

  public unloadConfig() {
    localStorage.removeItem('config');
    window.location.reload();
  }

  public hasConfig(): boolean {
    return localStorage.getItem('config') !== null;
  }
}
