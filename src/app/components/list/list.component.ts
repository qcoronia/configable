import { Component, OnInit } from '@angular/core';
import { ConfigProviderService } from 'src/app/services/config-provider.service';
import { ListConfigInterface } from 'src/app/models';
import { ReplaySubject } from 'rxjs';
import { tap, map, switchMap, subscribeOn } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public $listConfig: ReplaySubject<ListConfigInterface>;
  public $data: ReplaySubject<ListData>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) {
    this.$listConfig = new ReplaySubject<ListConfigInterface>(1);
    this.$listConfig.next(this.route.snapshot.data as ListConfigInterface);
    this.$data = new ReplaySubject<ListData>(1);
  }

  ngOnInit() {
    this.$listConfig.pipe(
      map(config => config.dataSourceUrl),
      switchMap(url => this.http.get<any[]>(url, { observe: 'body' })),
    ).subscribe(data => this.$data.next(data));
  }

}

export class ListData {
  [key: string]: any;
}
