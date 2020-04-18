import { ColumnInterface } from './column.interface';

export interface ListInterface {
  listName: string;
  dataSourceUrl: string;
  idAlias: string;
  columns: ColumnInterface[];
}
