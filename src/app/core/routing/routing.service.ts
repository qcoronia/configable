import { Injectable, OnDestroy } from '@angular/core';
import { Router, Route, Routes } from '@angular/router';
import { ConfigService } from '../configuration/config.service';
import { tap, take, distinctUntilChanged } from 'rxjs/operators';
import { ConfigInterface } from '../models/config.interface';
import { AppComponent } from '../../app.component';
import { TableComponent } from '../../table/table.component';
import { AreaInterface } from '../models/area.interface';
import { SectionInterface } from '../models/section.interface';
import { HomeComponent } from '../../home/home.component';
import { FormComponent } from '../../form/form.component';
import { ReplaySubject, Subscription } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { SigninComponent } from '../../signin/signin.component';

const authGuardConfig: Partial<Route> = {
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  canDeactivate: [AuthGuard],
  canLoad: [AuthGuard],
};

@Injectable({
  providedIn: 'root'
})
export class RoutingService implements OnDestroy {

  public routeUpdates$: Subscription;

  constructor(
    private configService: ConfigService,
    private router: Router) {
    this.routeUpdates$ = this.configService.config$.pipe(
      distinctUntilChanged()
    ).subscribe(config => this.refreshRoutes(config));
  }

  public ngOnDestroy() {
    this.routeUpdates$.unsubscribe();
  }

  public refreshRoutes(config: ConfigInterface) {
    const routes = this.buildRouteFromConfig(config);
    this.router.resetConfig(routes);
    this.router.initialNavigation();
  }

  private buildRouteFromConfig(config: ConfigInterface): Routes {
    return [
      { path: '', component: HomeComponent },
      { path: 'sign-in', component: SigninComponent },
      ...config.areas.map(area => this.mapAreaToRoute(area)),
    ];
  }

  private mapAreaToRoute(area: AreaInterface): Route {
    return {
      path: area.alias,
      children: [
        { path: '', redirectTo: '../', pathMatch: 'full' },
        ...area.sections.map(section => this.mapSectionToRoute(section)),
      ],
      ...authGuardConfig
    };
  }

  private mapSectionToRoute(section: SectionInterface): Route {
    return {
      path: section.alias,
      children: [
        { path: '', redirectTo: !!section.list ? 'list' : 'form', pathMatch: 'full' },
        { path: 'list', component: TableComponent, data: section.list },
        { path: 'form', component: FormComponent, data: section.form },
      ],
    } as Route;
  }
}
