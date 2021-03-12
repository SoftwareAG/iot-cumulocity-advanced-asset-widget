import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CoreModule, HOOK_COMPONENTS } from "@c8y/ngx-components";

import { AdvancedAssetWidgetComponent } from "./advanced-asset-widget.component";
import { AdvancedAssetWidgetConfigComponent } from "./advanced-asset-widget-config.component";
import { ContextWidgetConfig } from "@c8y/ngx-components/context-dashboard";

// This will import css from the styles folder (Note: will be applied globally, not scoped to the module/components)
// comment this if you want to test the widget
// import "~styles/index.css";

// You can also import css from a module
// import 'some-module/styles.css'
const routes = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CoreModule,
  ],
  declarations: [
    AdvancedAssetWidgetComponent,
    AdvancedAssetWidgetConfigComponent,
  ],
  entryComponents: [
    AdvancedAssetWidgetComponent,
    AdvancedAssetWidgetConfigComponent,
  ],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: "advanced.asset.widget",
        label: "Advanced Asset widget",
        description:
          "Shows a configurable grid of the child assets of a device or group",
        component: AdvancedAssetWidgetComponent,
        configComponent: AdvancedAssetWidgetConfigComponent,
        // comment this if you want to test the widget
        previewImage: require("./previewImage.png"),
        data: {
          settings: {
            noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
            ng1: {
              options: {
                noDeviceTarget: false, // Set this to true to hide the device selector.
                groupsSelectable: true, // Set this, if not only devices should be selectable.
              },
            },
          },
        } as ContextWidgetConfig,
      },
    },
  ],
})
export class AdvancedAssetWidgetModule {}
