import { ControlInterface } from '.';

export interface FormConfigInterface {
  formName: string;
  submitLabel: string;
  cancelLabel: string;
  controls: ControlInterface[];
}
