import { ValueType, ControlType } from '.';

export interface ControlInterface {
  label: string;
  field: string;
  type: ValueType;
  controlType: ControlType;
  helpText: string;
}
