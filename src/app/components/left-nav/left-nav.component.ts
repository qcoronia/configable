import { Component, OnInit, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { ConfigProviderService } from 'src/app/services/config-provider.service';
import { AreaInterface, ConfigInterface } from 'src/app/models';
import { pluck, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, Routes, Route } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ListComponent } from '../list/list.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  private $areas: Observable<AreaInterface[]>;

  constructor(
    private configProvider: ConfigProviderService,
    private router: Router) {
  }

  ngOnInit() {
    this.$areas = this.configProvider.$config.pipe(
      tap(config => this.refreshRoutes(config)),
      map(config => config.areas),
    );
  }

  public refreshRoutes(config: ConfigInterface) {
    this.router.resetConfig([
      { path: '', component: AppComponent },
      ...config.areas.map(area => ({
        path: area.slug,
        children: [
          { path: '', redirectTo: '../', pathMatch: 'full' },
          ...area.sections.map(section => ({
            path: section.slug,
            children: [
              { path: '', redirectTo: !!section.listConfig ? 'list' : 'form', pathMatch: 'full' },
              { path: 'list', component: ListComponent, data: section.listConfig },
              { path: 'form', component: FormComponent, data: section.formConfig },
            ],
          } as Route))
        ],
      } as Route)),
    ] as Routes);
  }

  // UI EVENTS

  public dropdownClicked(slug: string) {
    const dropdowns = document.getElementsByClassName('js-arrow');
    for (let i = 0; i < dropdowns.length; i++) {
      const dropdown = dropdowns.item(i);
      if (dropdown.classList.contains(`area-${slug}`)) {
        for (let i = 0; i < dropdown.parentElement.children.length; i++) {
          const child = dropdown.parentElement.children.item(i);
          if (child.classList.contains('js-sub-list')) {
            dropdown.classList.toggle('open');
            child.classList.toggle('show-list');
            return;
          }
        }

        return;
      }
    }
  }

}
