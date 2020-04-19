import { AreaInterface } from './area.interface';

export interface ConfigInterface {
  appName: string;
  apiUrl: string;
  areas: AreaInterface[];
}
