import { ColumnInterface } from '.';

export interface ListConfigInterface {
  idField: string;
  dataSourceUrl: string;
  columns: ColumnInterface[];
}
