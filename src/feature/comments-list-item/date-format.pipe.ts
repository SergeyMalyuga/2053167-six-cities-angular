import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: string | undefined) {
    if (value) {
      return dayjs(value).format('MMMM YYYY');
    }
    return '';
  }
}
