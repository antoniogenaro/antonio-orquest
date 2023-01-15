import { Pipe, PipeTransform } from '@angular/core';
import { formatInTimeZone } from 'date-fns-tz';
import es from 'date-fns/locale/es';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'dateTz',
})
export class DateTzPipe implements PipeTransform {
  transform(
    date: Date | string | number | undefined | null,
    format: string
  ): string {
    if (date) {
      return formatInTimeZone(new Date(date), environment.timezone, format, {
        locale: es,
      });
    }
    return '';
  }
}
