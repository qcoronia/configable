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

  public hasConfig$: Observable<boolean> = this.configService.config$.pipe(map(config => !!config));

  constructor(private configService: ConfigService) {
    let configUrl = localStorage.getItem('config');
    if (!!configUrl) {
      this.configService.load(configUrl);
    }

  }
}
