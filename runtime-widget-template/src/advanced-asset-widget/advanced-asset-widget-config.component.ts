import { Component, Input } from '@angular/core';

@Component({
    template: `<div class="form-group">
    <c8y-form-group>
      <label translate>ID of the device or group</label>
      <textarea style="width:100%" [(ngModel)]="config.text"></textarea>
    </c8y-form-group>
  </div>`
})
export class AdvancedAssetWidgetConfig {
    @Input() config: any = {};
}