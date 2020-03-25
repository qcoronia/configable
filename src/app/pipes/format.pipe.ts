import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber, formatDate } from '@angular/common';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: any, type: string, format: string): any {
    if (!value) {
      return value;
    }

    if (!format) {
      return value;
    }

    switch (type) {
      case 'number':
        return formatNumber(value, 'en-US', format);

      case 'date':
        return formatDate(value, format, 'en-US');

      default:
          return value;
    }
  }

}
