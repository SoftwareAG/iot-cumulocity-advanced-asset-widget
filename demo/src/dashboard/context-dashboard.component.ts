import { Component, OnInit } from '@angular/core';
import { Widget } from '@c8y/ngx-components';

@Component({
  selector: 'app-context-dashboard',
  templateUrl: './context-dashboard.component.html'
})
export class ContextDashboardComponent {
  defaultWidgets: Widget[] = [
    {
      _x: 0,
      _y: 0,
      _width: 12,
      _height: 12,
      componentId: 'advanced.asset.widget',
      config: {
        groupOrDeviceId: 2002 
      },
      title: 'Advanced Asset Widget Demo',
      id: 'some_unique_id'
    }
  ];
}
