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
      const textArray = [];
      const hours = Math.floor(minutes / 60);
      const minutesRest = minutes % 60;
      textArray.push(`${hours} horas`);
      if (minutesRest) {
        textArray.push(`${minutesRest} minutos`);
      }
      return textArray.join(' ') || '';
    }
    return '';
  }
}
