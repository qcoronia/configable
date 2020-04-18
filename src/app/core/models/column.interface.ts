import { DataType } from './data.type';

export interface ColumnInterface {
  columnName: string;
  alias: string;
  dataType: DataType;
}
