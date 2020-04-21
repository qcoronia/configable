import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';
import { ConfigService } from '../core/configuration/config.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { SectionInterface } from '../core/models/section.interface';
import { AppStateService } from '../core/app-state/app-state.service';
import { ListInterface } from '../core/models/list.interface';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../core/api/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  @ViewChild(MatTable) private table: MatTable<TableItem>;
  public dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['id', 'name'];
  public actionColumns = ['action.view'];

  public listConfig: ListInterface;

  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService,
    private api: ApiService) {
    this.listConfig = this.route.snapshot.data as ListInterface;
    this.displayedColumns = this.listConfig.columns
      .map(col => col.alias)
      .concat(this.actionColumns);
    this.appStateService.set({
      headerName: this.listConfig.listName,
    });
  }

  ngOnInit() {
    const dataSourceRequest$ = this.api.get<TableItem[]>(this.listConfig.dataSourceUrl);
    this.dataSource = new TableDataSource(dataSourceRequest$);
    this.dataSource.setListConfig(this.listConfig);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
