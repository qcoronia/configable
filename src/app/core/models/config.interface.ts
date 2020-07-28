import { AreaInterface } from './area.interface';

export interface ConfigInterface {
  appName: string;
  apiUrl: string;
  authUrl: string;
  authEntity: string;
  areas: AreaInterface[];
}
