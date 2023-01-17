import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours',
})
export class HoursPipe implements PipeTransform {
  /**
   * Transform minutes to hours and minutes string
   */
  transform(minutes: number): string {
    if (typeof minutes === 'number') {
      const hours = Math.floor(minutes / 60);
      const minutesRest = minutes % 60;
      const hoursText = `${hours} horas`;
      const minutesRestText = minutesRest ? `${minutesRest} minutos` : null;
      return `${hoursText} ${minutesRestText ?? ''}`;
    }
    return '';
  }
}
