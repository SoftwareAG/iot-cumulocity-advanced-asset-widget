import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { DynamicComponent, OnBeforeSave, AlertService } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-widget-config-demo',
  template: `
    <div class="form-group">
      <c8y-form-group>
        <label translate>Text</label>
        <textarea
          style="width:100%"
          [(ngModel)]="config.text"
          name="text"
          [required]="true"
        ></textarea>
      </c8y-form-group>
    </div>
  `,
  // We connect our parent Form to this form (for disabling the save button)
  // you can also enable the button by using ContextServiceDashboard.formDisabled
  // property instead (by default it is enabled).
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class WidgetConfigDemo implements DynamicComponent, OnBeforeSave {
  /**
   * The configuration which is shared between configuration component and display component.
   * Should be searilzabled to allow to save it to the API. The config is saved automatically
   * to the API on "save"-button hit. The onBeforeSave handler can be used to change this behavior,
   * or to manipulate the object.
   */
  @Input() config: any = {};

  /**
   * Default Angular DI can be used, to use additional services.
   */
  constructor(private alert: AlertService) {}

  /**
   * This example onBeforeSave handler cancels the saving, if the text is only a white-space.
   */
  onBeforeSave(config: any): boolean {
    if (config.text.trim() === '') {
      this.alert.warning('Please enter a valid text.');
      return false;
    }
    return true;
  }
}
