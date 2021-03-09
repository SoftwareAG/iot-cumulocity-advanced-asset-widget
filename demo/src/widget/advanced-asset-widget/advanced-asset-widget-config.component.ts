import { Component, Input } from "@angular/core";
import { DynamicComponent, OnBeforeSave } from "@c8y/ngx-components";
import { Observable } from "rxjs";

export type AdvancedAssetWidgetConfig = {
  title?: string;
  device?: {
    name: string;
    id: string;
  };
};
@Component({
  template: `<div class="form-group">
    <c8y-form-group>
      <label for="tableTitle" translate>Name of the table (optional)</label>
      <input
        id="tableTitle"
        type="text"
        title=""
        style="width:100%"
        [(ngModel)]="config.title"
      />
    </c8y-form-group>
  </div>`,
})
export class AdvancedAssetWidgetConfigComponent
  implements DynamicComponent, OnBeforeSave {
  @Input() config: AdvancedAssetWidgetConfig = {};

  onBeforeSave(
    config: AdvancedAssetWidgetConfig
  ): boolean | Promise<boolean> | Observable<boolean> {
    // implement validation logics here if necessary
    return true;
  }
}
