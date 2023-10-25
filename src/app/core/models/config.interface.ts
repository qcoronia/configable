import { JTDSchemaType } from 'ajv/dist/core';
import { AreaInterface } from './area.interface';
import { AuthInterface } from './auth.interface';

export interface ConfigInterface {
  appName: string;
  apiUrl: string;
  auth: AuthInterface;
  areas: AreaInterface[];
}
