import { Component, Input } from "@angular/core";
import {
  ActionControl,
  BuiltInActionType,
  BulkActionControl,
  Column,
  ColumnDataType,
} from "@c8y/ngx-components";
import { AdvancedAssetWidgetDatasource } from "./advanced-asset-widget-datasource.service";

@Component({
  providers: [AdvancedAssetWidgetDatasource],
  selector: "advanced-data-grid",
  templateUrl: "./advanced-asset-widget.component.html",
  styles: [
    `
      .sort-fix.resize-handle {
        width: 0;
      }
    `,
  ],
})
export class AdvancedAssetWidgetComponent {
  @Input() set config(cfg: any) {
    this.datasource.config = cfg;
  }
  columns: Column[];

  actionControls: ActionControl[] = [
    { type: BuiltInActionType.Delete, callback: (item) => console.dir(item) },
    { type: BuiltInActionType.Edit, callback: (item) => console.dir(item) },
  ];
  bulkActionControls: BulkActionControl[] = [
    {
      type: BuiltInActionType.Export,
      callback: (selectedItemIds) => console.dir(selectedItemIds),
    },
    {
      type: BuiltInActionType.Delete,
      callback: (selectedItemIds) => console.dir(selectedItemIds),
    },
  ];

  constructor(public datasource: AdvancedAssetWidgetDatasource) {
    this.columns = this.getDefaultColumns();
  }

  getDefaultColumns(): Column[] {
    return [
      { name: "id", header: "ID", path: "id" },
      {
        name: "name",
        header: "Name",
        path: "name",
        dataType: ColumnDataType.TextShort,
        sortable: true,
        filterable: true,
      },
      {
        header: "Last Updated",
        name: "lastUpdated",
        sortable: true,
        path: "lastUpdated",
        dataType: ColumnDataType.TextShort,
      },
    ];
  }

  handleItemsSelect(selectedItemIds: string[]) {
    console.log("selected item ids:");
    console.dir(selectedItemIds);
  }
}
