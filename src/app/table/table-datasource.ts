import { DataSource } from '@angular/cdk/collections';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subscription, iif, ReplaySubject, BehaviorSubject, Subject } from 'rxjs';
import { ListInterface } from '../core/models/list.interface';

// TODO: Replace this with your own data model type
export interface TableItem {
  [key: string]: any;
}

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  public dataChanged: (data: TableItem[]) => void;

  private dataSourceRequest$: Observable<TableItem[]>;
  private listConfig: ListInterface;
  private filter$: BehaviorSubject<FilterContext>;

  constructor(dataSource: Observable<TableItem[]>) {
    super();
    this.dataSourceRequest$ = dataSource.pipe(
      distinctUntilChanged()
    );
    this.filter$ = new BehaviorSubject<FilterContext>({
      filterValue: '',
    });
    this.dataChanged = (data: TableItem[]) => { };
  }

  public setListConfig(listConfig: ListInterface) {
    this.listConfig = listConfig;
  }

  public setFilter(filterValue: string) {
    this.filter$.next({
      filterValue: filterValue,
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.dataSourceRequest$,
      this.paginator.page,
      this.sort.sortChange,
      this.filter$,
    ];

    return merge(...dataMutations).pipe(
      map(data => {
        if (Array.isArray(data)) {
          this.data = [...data];
        }

        const filteredData = this.getFilteredData(this.filter$.value.filterValue, [...this.data]);
        const sortedData = this.getSortedData(filteredData);
        const pagedData = this.getPagedData(sortedData);
        return pagedData;
      }),
      tap(pagedData => this.dataChanged(pagedData))
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Filter the data (client-side). If you're using server-side filtering,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getFilteredData(filterValue: string, data: TableItem[]) {
    return data.filter(e => Object.values(e).join('').includes(filterValue));
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      const column = this.listConfig.columns
        .find(e => e.alias === this.sort.active);
      const aVal = a[this.sort.active];
      const bVal = b[this.sort.active];
      switch (column.dataType) {
        case 'string': return compare(aVal, bVal, isAsc);
        case 'number': return compare(+aVal, +bVal, isAsc);
        case 'boolean': return compare(!!aVal ? 1 : 0, !!bVal ? 1 : 0, isAsc);
        case 'date': return compare(aVal, bVal, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface FilterContext {
  filterValue: string;
}
