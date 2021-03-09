import { Component } from '@angular/core';
import { DashboardChildDimension } from '@c8y/ngx-components';

@Component({
  selector: 'custom-dashboard',
  templateUrl: './custom-dashboard.component.html'
})
export class CustomDashboardComponent {
  widgets = [
    { x: 0, y: 0, width: 12, height: 1 },
    { x: 3, y: 1, width: 5, height: 2 }
  ] as DashboardChildDimension[];
  isFrozen = false;
  showTitle = true;
  editComponent = false;

  /**
   * Add a random child to the dashboard.
   */
  addRandom() {
    let width = Math.round(Math.random() * 10);
    if (width < 2) {
      width += 2;
    }

    let height = Math.round(Math.random() * 10);
    if (height < 1) {
      height += 1;
    }
    this.widgets.push({ width, height });
  }

  /**
   * Called when the user change the dashboard
   */
  dashboardChange(event) {
    console.log(event);
  }
}
