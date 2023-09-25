import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTable as MatTable } from '@angular/material/legacy-table';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { TableDataSource, TableItem } from './table-datasource';
import { ActivatedRoute, ExtraOptions } from '@angular/router';
import { AppStateService } from '../core/app-state/app-state.service';
import { ListInterface } from '../core/models/list.interface';
import { ApiService } from '../core/api/api.service';
import { tap } from 'rxjs/operators';
import { TableSelectionState } from './table-selection-state';
import { merge } from 'rxjs';

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
  public displayedColumns = [];
  public leftActionColumns = ['action.checkbox'];
  public rightActionColumns = ['action.view'];

  public listConfig: ListInterface;

  public selection: TableSelectionState;

  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService,
    private api: ApiService,
    private matSnackBar: MatSnackBar) {
    this.listConfig = this.route.snapshot.data as ListInterface;
    this.displayedColumns = this.leftActionColumns
      .concat(this.listConfig.columns
        .map(col => col.alias))
      .concat(this.rightActionColumns);
    this.appStateService.set({
      headerName: this.listConfig.listName,
    });

    this.selection = new TableSelectionState();
  }

  ngOnInit() {
    const dataSourceRequest$ = this.api.get<TableItem[]>(this.listConfig.dataSourceUrl).pipe(
      tap(data => this.selection.resetState(data.map(e => e[this.listConfig.idAlias]))),
    );
    this.dataSource = new TableDataSource(dataSourceRequest$);
    this.dataSource.setListConfig(this.listConfig);
    this.dataSource.dataChanged = data => this.selection.toggleAll(false);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.setFilter(filterValue.trim().toLowerCase());
  }

  public selectAll(changeEvt: MatCheckboxChange) {
    this.selection.toggleAll(changeEvt.checked);
  }

  public select(changeEvt: MatCheckboxChange, id: string) {
    this.selection.toggle(id, changeEvt.checked);
  }

  public deleteSelected() {
    const selectedItems = this.selection.getSelected();
    merge(selectedItems
      .map(id => this.api.delete(this.listConfig.deleteUrl
        .replace(`{${this.listConfig.idAlias}}`, id))),
    ).pipe().subscribe(() => this.matSnackBar.open(`${selectedItems.length} items deleted`, null, {
      duration: 3000,
    }));
  }
}
