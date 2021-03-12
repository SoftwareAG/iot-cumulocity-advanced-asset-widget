import { Component, Input } from "@angular/core";
import {
  ActionControl,
  BulkActionControl,
  Column,
  ColumnDataType,
} from "@c8y/ngx-components";
import { AdvancedAssetWidgetConfig } from "./advanced-asset-widget-config.component";
import { AdvancedAssetWidgetDatasource } from "./advanced-asset-widget-datasource.service";
import { ViewEncapsulation } from "@angular/core";

@Component({
  providers: [AdvancedAssetWidgetDatasource],
  selector: "advanced-data-grid",
  templateUrl: "./advanced-asset-widget.component.html",
  styles: [
    `
      .sort-fix .resize-handle {
        width: 0px;
      }

      #cdk-drop-list-1 {
        color: white
        opacity: 1 
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AdvancedAssetWidgetComponent {
  @Input() set config(cfg: AdvancedAssetWidgetConfig) {
    this.title = cfg.title;
    this.datasource.config = cfg;
  }
  title: string;
  columns: Column[];

  actionControls: ActionControl[] = [
    // { type: BuiltInActionType.Delete, callback: (item) => console.dir(item) },
    // { type: BuiltInActionType.Edit, callback: (item) => console.dir(item) },
  ];
  bulkActionControls: BulkActionControl[] = [
    // {
    //   type: BuiltInActionType.Export,
    //   callback: (selectedItemIds) => console.dir(selectedItemIds),
    // },
    // {
    //   type: BuiltInActionType.Delete,
    //   callback: (selectedItemIds) => console.dir(selectedItemIds),
    // },
  ];

  constructor(public datasource: AdvancedAssetWidgetDatasource) {
    this.columns = this.getDefaultColumns();
  }

  getDefaultColumns(): Column[] {
    return [
      {
        name: "id",
        header: "ID",
        path: "id",
        sortable: true,
        filterable: true,
      },
      {
        name: "name",
        header: "Name",
        path: "name",
        dataType: ColumnDataType.TextShort,
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.order_nr",
        header: "Order Nummer",
        path: "cmdb_properties.order_nr",
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.case_id",
        header: "Case Id",
        path: "cmdb_properties.case_id",
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.charge_nr",
        header: "Charge Nummer",
        path: "cmdb_properties.charge_nr",
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.artikel_nr",
        header: "Artikel Nummer",
        path: "cmdb_properties.artikel_nr",
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
