import { NgModule } from '@angular/core';
import { DateTzPipe } from './date-tz.pipe';

@NgModule({
  exports: [DateTzPipe],
  declarations: [DateTzPipe],
})
export class DateTzPipeModule {}
