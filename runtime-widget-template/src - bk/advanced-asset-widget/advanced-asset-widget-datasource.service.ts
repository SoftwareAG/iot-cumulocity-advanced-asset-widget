import { Injectable } from "@angular/core";
import {
  Column,
  DataSourceModifier,
  Pagination,
  ServerSideDataResult,
} from "@c8y/ngx-components";
import {
  InventoryService,
  QueriesUtil,
  IResultList,
  IManagedObject,
  IdReference,
} from "@c8y/client";
import { AdvancedAssetWidgetConfig } from "./advanced-asset-widget-config.component";
import { stringify } from "@angular/compiler/src/util";

@Injectable()
export class AdvancedAssetWidgetDatasource {
  serverSideDataCallback: Promise<ServerSideDataResult>;
  columns: Column[];

  pagination: Pagination = {
    pageSize: 10,
    currentPage: 1,
  };

  private readonly queriesUtil = new QueriesUtil();

  set config(cfg: AdvancedAssetWidgetConfig) {
    if (cfg && cfg.device) {
      // Extract group or device id
      this.BASE_QUERY = {
        __has: "c8y_IsDevice",
      };
      this.groupOrDeviceId = cfg.device.id;
    } else {
      this.BASE_QUERY = {
        __has: "c8y_IsDevice",
      };
    }
  }
  private groupOrDeviceId: IdReference = null;
  /**
   * The query to be used if the table loads without any column filters.
   */
  private BASE_QUERY = {};

  constructor(private inventoryService: InventoryService) {
    this.serverSideDataCallback = this.onDataSourceModifier.bind(this);
  }

  async onDataSourceModifier(
    dataSourceModifier: DataSourceModifier
  ): Promise<ServerSideDataResult> {
    //alert("Filtering...")
    this.columns = [...(dataSourceModifier.columns || [])];

    const filterQuery = this.createQueryFilter(dataSourceModifier.columns);
    //alert(JSON.stringify(filterQuery, null, 4));
    const allQuery = this.createQueryFilter([]);
    //alert(JSON.stringify(allQuery, null, 4));

    const devices = this.fetchForPage(
      this.groupOrDeviceId,
      filterQuery,
      dataSourceModifier.pagination
    );
    const filtered = this.fetchCount(this.groupOrDeviceId, filterQuery);
    const total = this.fetchCount(this.groupOrDeviceId, allQuery);
    const [devicesResponse, filteredSize, size] = await Promise.all([
      devices,
      filtered,
      total,
    ]);

    const result: ServerSideDataResult = {
      size,
      filteredSize,
      ...devicesResponse,
    };

    console.log("The data from backend: " + JSON.stringify(result, null, 4));
    return result;
  }

  private fetchForPage(
    parentReference: IdReference,
    query: object,
    pagination: Pagination
  ): Promise<IResultList<IManagedObject>> {
    const filters = {
      ...query,
      withParents: true,
      pageSize: pagination.pageSize,
      currentPage: pagination.currentPage,
      withTotalPages: false,
    };

    return this.groupOrDeviceId
      ? this.inventoryService.childAssetsList(parentReference, filters)
      : this.inventoryService.list(filters);
  }

  /**
   * Returns the complete count of items. Use wisely ond only if really necessary as the calculation of the count is expensive on server-side.
   * @param query
   */
  private fetchCount(
    parentReference: IdReference,
    query: object
  ): Promise<number> {
    const filters = {
      ...query,
      pageSize: 1,
      currentPage: 1,
      withTotalPages: true,
    };
    const fetch = parentReference
      ? this.inventoryService.childAssetsList(parentReference, filters)
      : this.inventoryService.list(filters);
    return fetch.then((result) => result.paging.totalPages);
  }

  private createQueryFilter(columns: Column[]): { query: string } {
    const query = columns.reduce(this.extendQueryByColumn, {
      __filter: this.BASE_QUERY,
      __orderby: [],
    });

    const queryString = this.queriesUtil.buildQuery(query);

    return { query: queryString };
  }

  private extendQueryByColumn = (query: any, column: Column) => {
    if (column.filterable && column.filterPredicate) {
      const queryObj: any = {};
      queryObj[column.path] = column.filterPredicate;
      query.__filter = { ...query.__filter, ...queryObj };
    }

    if (column.filterable && column.externalFilterQuery) {
      query.__filter = { ...query.__filter, ...column.externalFilterQuery };
    }

    if (column.sortable && column.sortOrder) {
      const cs: any = {};
      cs[column.path] = column.sortOrder === "asc" ? 1 : -1;
      query.__orderby.push(cs);
    }

    return query;
  };
}
