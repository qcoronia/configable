import { FormControlInterface } from './form-control.interface';

export interface FormInterface {
  formName: string;
  dataSourceUrl: string;
  idAlias: string;
  createUrl: string;
  updateUrl: string;
  formControls: FormControlInterface[];
}
