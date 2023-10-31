import { DataType } from './data.type';

export interface FormControlInterface {
  fieldName: string;
  alias: string;
  isReadOnly: boolean;
  dataType: DataType;
  referenceTo?: string;
}
