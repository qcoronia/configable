import { ColumnInterface } from './column.interface';

export interface ListInterface {
  listName: string;
  dataSourceUrl: string;
  deleteUrl: string;
  idAlias: string;
  columns: ColumnInterface[];
}
