import { Component, OnInit, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { ConfigProviderService } from 'src/app/services/config-provider.service';
import { AreaInterface, ConfigInterface } from 'src/app/models';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  private $areas: Observable<AreaInterface[]>;

  constructor(private http: HttpClient
    // @Inject(ConfigProviderService) private configProvider: ConfigProviderService,
    ) { }

  ngOnInit() {
    this.$areas = this.http.get<ConfigInterface>(`assets/configs/default.json`).pipe(
      pluck("areas"),
      tap(console.warn),
    );
  }

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
