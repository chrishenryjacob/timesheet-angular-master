import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    SharedModule,
    CommonModule,
    TimesheetRoutingModule,
    AutoCompleteModule,
    CalendarModule,
    ButtonModule,
    TableModule,
  ],
})
export class TimesheetModule {}
