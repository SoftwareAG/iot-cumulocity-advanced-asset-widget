import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as ngRouterModule, Routes } from "@angular/router";
import { ContextDashboardModule } from "@c8y/ngx-components/context-dashboard";

import {
  CoreModule,
  BootstrapComponent,
  RouterModule,
} from "@c8y/ngx-components";
import {
  OperationsModule,
} from "@c8y/ngx-components/operations";

import { DashboardWidgetDemoModule } from "./src/widget/demo-widget.module";
import { CustomDashboardComponent } from "./src/dashboard/custom-dashboard.component";
import { WidgetDashboardComponent } from "./src/dashboard/widget-dashboard.component";
import { ContextDashboardComponent } from "./src/dashboard/context-dashboard.component";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AdvancedAssetWidgetModule } from "./src/widget/advanced-asset-widget";

/**
 * Angular Routes.
 * Within this array at least path (url) and components are linked.
 */
const appRoutes: Routes = [
  {
    path: "dashboards/custom",
    component: CustomDashboardComponent,
  },
  {
    path: "dashboards/widget",
    component: WidgetDashboardComponent,
  },
  {
    path: "dashboards/context",
    component: ContextDashboardComponent,
  },
  {
    path: "",
    redirectTo: "dashboards/context",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    CustomDashboardComponent,
    WidgetDashboardComponent,
    ContextDashboardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true }),
    RouterModule.forRoot(),
    // Import the CoreModule to add c8y functionality
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DashboardWidgetDemoModule,
    AdvancedAssetWidgetModule,
    ContextDashboardModule.config(),
    OperationsModule,
  ],
  /**
   * Use our predefined InjectionTokens and provide your own classes to extend behavior
   * and functionality of existing ones. Implement your own NavigationNodes, Tabs, Actions and Breadcrumbs
   */
  providers: [BsModalRef],

  /**
   * Bootstrap your application with the BootstrapComponent which will use the `<c8y-bootstrap>`
   * component to initialize the root application. Alternatively you can bootstrap
   * a component of your choice and include that tag into its template or only reuse the given components
   */
  bootstrap: [BootstrapComponent],
  /**
   * The EntryComponents to allow the HOOK_ONCE_ROUTE to work.
   */
  entryComponents: [],
})
export class AppModule {}
