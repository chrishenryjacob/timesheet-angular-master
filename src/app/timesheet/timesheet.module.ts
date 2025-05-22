import { NgModule } from '@angular/core';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [TimesheetComponent],
  imports: [SharedModule, TimesheetRoutingModule],
})
export class TimesheetModule {}
