import { Component, OnInit } from '@angular/core';
import { ConfigProviderService } from 'src/app/services/config-provider.service';
import { ListConfigInterface } from 'src/app/models';
import { ReplaySubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public $listConfig: ReplaySubject<ListConfigInterface>;

  constructor(
    private route: ActivatedRouteSnapshot) {
    this.$listConfig = new ReplaySubject<ListConfigInterface>(1);
    this.$listConfig.next(this.route.data as ListConfigInterface);
  }

  ngOnInit() {
  }

}
