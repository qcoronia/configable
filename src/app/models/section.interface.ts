import { ListConfigInterface, FormConfigInterface } from '.';

export interface SectionInterface {
  sectionName: string;
  slug: string;
  listConfig: ListConfigInterface;
  formConfig: FormConfigInterface;
}
