import { Component, Input } from "@angular/core";
import {
  ActionControl,
  BulkActionControl,
  Column,
  ColumnDataType,
} from "@c8y/ngx-components";
import { AdvancedAssetWidgetConfig } from "./advanced-asset-widget-config.component";
import { AdvancedAssetWidgetDatasource } from "./advanced-asset-widget-datasource.service";

@Component({
  providers: [AdvancedAssetWidgetDatasource],
  selector: "advanced-data-grid",
  templateUrl: "./advanced-asset-widget.component.html",
  styleUrls: ["./advanced-asset-widget.component.css"],
})
export class AdvancedAssetWidgetComponent {
  @Input() set config(cfg: AdvancedAssetWidgetConfig) {
    //alert(JSON.stringify(cfg, null, 4)); // by FKA
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
      { name: "id", 
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
        name: "cmdb_properties.OrderNr",  
        header: "Order Nummer",
        path: "cmdb_properties.OrderNr", 
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.CaseId",  
        header: "Case Id",
        path: "cmdb_properties.CaseId", 
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.ChargeNr",  
        header: "Charge Nummer",
        path: "cmdb_properties.ChargeNr", 
        sortable: true,
        filterable: true,
      },
      {
        name: "cmdb_properties.ArticleNr",  
        header: "Artikel Nummer",
        path: "cmdb_properties.ArticleNr", 
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
