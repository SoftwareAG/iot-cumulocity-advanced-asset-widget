import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetDemo } from './demo-widget.component';
import { WidgetConfigDemo } from './demo-widget-config.component';
import { HOOK_COMPONENTS, FormsModule, NavigatorService, DynamicComponentDefinition } from '@c8y/ngx-components';
import { ContextWidgetConfig } from '@c8y/ngx-components/context-dashboard';

/**
 * This demo widget provides an example on how
 * to use the HOOK_COMPONENTS. The component itself
 * is implemented in the dashboard on the
 * ../hello/hello.component.html by using the
 * dynamic-component tag.
 */
@NgModule({
  declarations: [WidgetDemo, WidgetConfigDemo],
  entryComponents: [WidgetDemo, WidgetConfigDemo],
  imports: [CommonModule, FormsModule],
  exports: [],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: [
        {
          id: 'angular.widget.demo',
          label: 'My angular widget',
          description: 'This is a description from  angular',
          component: WidgetDemo,
          configComponent: WidgetConfigDemo,

          /** new Angular-Dashboard definition */
          data: {
            settings: {
              noNewWidgets: false,          // Set this to true, to don't allow adding new widgets.
              ng1: {
                options: {
                  noDeviceTarget: true,     // Set this to true to hide the device selector.
                  groupsSelectable: false,  // Set this, if not only devices should be selectable.
                }
              }
            }
          } as ContextWidgetConfig

          /** legacy definition */
          /*data: {
            settings: {
              noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
            },
            ng1: {
              options: {
                groupsSelectable: false, // Set this, if not only devices should be selectable.
                noDeviceTarget: true // Set this to true to hide the device selector
              }
            }
          }*/
        }
      ] as DynamicComponentDefinition[]
    }
  ]
})
export class DashboardWidgetDemoModule {}
