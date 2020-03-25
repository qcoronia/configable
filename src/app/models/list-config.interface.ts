import { ColumnInterface, FormConfigInterface } from '.';

export interface ListConfigInterface {
  idField: string;
  columns: ColumnInterface[];
  formConfig: FormConfigInterface;
}
