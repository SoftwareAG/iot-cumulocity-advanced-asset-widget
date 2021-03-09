import { Component, Input } from '@angular/core';

@Component({
  selector: 'c8y-widget-demo',
  template: `
    <div class="p-16">
      <h1>Hi I'm a widget from angular</h1>
      <p class="text">{{ config?.text || 'No text' }}</p>
      <small>My context is: {{ config?.device?.name || 'No context' }}</small>
    </div>
  `,
  styles: [
    `
      .text {
        transform: scaleX(-1);
        font-size: 3em;
      }
    `
  ]
})
export class WidgetDemo {
  @Input() config;
}
