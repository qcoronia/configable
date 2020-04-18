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

  private listConfig: ListInterface;

  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService) {
    this.listConfig = this.route.snapshot.data as ListInterface;
    this.displayedColumns = this.listConfig.columns.map(col => col.alias);
    this.appStateService.set({
      headerName: this.listConfig.listName,
    });
  }

  ngOnInit() {
    this.dataSource = new TableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
