import { FormInterface } from './form.interface';
import { ListInterface } from './list.interface';

export interface SectionInterface {
    sectionName: string;
    alias: string;
    list: ListInterface;
    form: FormInterface;
}
