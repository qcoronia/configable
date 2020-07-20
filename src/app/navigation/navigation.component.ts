import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { ConfigService } from '../core/configuration/config.service';
import { AreaInterface } from '../core/models/area.interface';
import { RoutingService } from '../core/routing/routing.service';
import { AppStateService } from '../core/app-state/app-state.service';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public appName$: Observable<string> = this.configService.config$
    .pipe(
      map(config => config.appName),
    );

  public areas$: Observable<AreaInterface[]> = this.configService.config$
    .pipe(
      map(config => config.areas),
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService,
    private routingService: RoutingService,
    public authService: AuthService,
    public appStateService: AppStateService) {
  }

}
