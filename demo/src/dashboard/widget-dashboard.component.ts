import { Component } from '@angular/core';
import { DashboardChildDimension, Widget, DashboardSettings, DashboardChange } from '@c8y/ngx-components';

@Component({
  selector: 'widget-dashboard',
  templateUrl: './widget-dashboard.component.html'
})
export class WidgetDashboardComponent {
  widgets = [
    { _x: 0, _y: 0, _width: 6, _height: 4, componentId: 'angular.widget.demo' },
    { _x: 6, _y: 0, _width: 6, _height: 6, componentId: 'angular.widget.demo' },
    { _x: 0, _y: 0, _width: 6, _height: 6, componentId: 'advanced.asset.widget' }
  ] as Widget[];

  toggleFreeze(event: DashboardSettings) {
    console.log('toggle freeze called', event);
    event.isFrozen = !event.isFrozen;
  }

  change(event: DashboardChange) {
    console.log('change called', event);
  }

  addWidget() {
    console.log('add called');
  }

  editWidget(event: DashboardChange) {
    console.log('edit called', event);
  }

  editDashboard() {
    console.log('edit dashboard called');
  }

  update(event: DashboardChange) {
    console.log(event);
  }
}
