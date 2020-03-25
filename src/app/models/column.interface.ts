import { ValueType } from '.';

export interface ColumnInterface {
  label: string;
  field: string;
  type: ValueType;
  format: string;
}
