import { NgModule } from '@angular/core';
import { HoursPipe } from './hours.pipe';

@NgModule({
  exports: [HoursPipe],
  declarations: [HoursPipe],
})
export class HoursPipeModule {}
