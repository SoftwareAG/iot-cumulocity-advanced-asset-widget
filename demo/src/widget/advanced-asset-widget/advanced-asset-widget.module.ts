import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CoreModule, HOOK_COMPONENTS } from "@c8y/ngx-components";

import { AdvancedAssetWidgetComponent } from "./advanced-asset-widget.component";
import { AdvancedAssetWidgetConfig } from "./advanced-asset-widget-config.component";

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
  declarations: [AdvancedAssetWidgetComponent, AdvancedAssetWidgetConfig],
  entryComponents: [AdvancedAssetWidgetComponent, AdvancedAssetWidgetConfig],
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
        configComponent: AdvancedAssetWidgetConfig,
        // comment this if you want to test the widget
        // previewImage: require("~styles/previewImage.png"),
        // data: {
        //     settings: {
        //         noDeviceTarget: true
        //     }
        // }
      },
    },
  ],
})
export class AdvancedAssetWidgetModule {}
