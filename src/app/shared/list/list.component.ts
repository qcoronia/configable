import { Component, OnInit } from '@angular/core';
import { ConfigProviderService } from 'src/app/services/config-provider.service';
import { ListConfigInterface } from 'src/app/models';
import { ReplaySubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public $listConfig: ReplaySubject<ListConfigInterface>;
  public $data: ReplaySubject<ListData>;

  constructor(
    private route: ActivatedRoute) {
    this.$listConfig = new ReplaySubject<ListConfigInterface>(1);
    this.$listConfig.next(this.route.snapshot.data as ListConfigInterface);
    this.$data = new ReplaySubject<ListData>(1);
  }

  ngOnInit() {
    this.$data.next([
      { id: 1, name: 'Sample 1', age: 12, birthDate: new Date(1964, 2, 27) },
      { id: 2, name: 'Sample 2', age: 63, birthDate: new Date(1972, 11, 17) },
      { id: 3, name: 'Sample 3', age: 24, birthDate: new Date(1994, 6, 27) },
      { id: 4, name: 'Sample 4', age: 37, birthDate: new Date(1994, 8, 22) },
    ]);
  }

}

export class ListData {
  [key: string]: any;
}
