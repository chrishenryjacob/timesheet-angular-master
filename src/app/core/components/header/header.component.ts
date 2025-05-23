import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routes = [
    {
      title: 'Dashboard',
      url: 'dashboard',
    },
    {
      title: 'Timesheet',
      url: 'timesheet',
    },
  ];
}
