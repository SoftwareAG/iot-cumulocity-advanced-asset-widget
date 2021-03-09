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

@Injectable()
export class AdvancedAssetWidgetDatasource {
  serverSideDataCallback: Promise<ServerSideDataResult>;
  columns: Column[];

  pagination: Pagination = {
    pageSize: 10,
    currentPage: 1,
  };

  private readonly queriesUtil = new QueriesUtil();

  set config(cfg: any) {
    console.log(JSON.stringify(cfg));
    const identifier = +cfg.text;
    if (identifier !== NaN) {
      this.groupId = +cfg.text;
    }
    //   this.BASE_QUERY = {
    //       fragmentType: 'c8y_IsGroup',
    //       id: cfg.id
    //   }
  }
  private groupId: IdReference;
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
    this.columns = [...(dataSourceModifier.columns || [])];

    const filterQuery = this.createQueryFilter(dataSourceModifier.columns);
    const allQuery = this.createQueryFilter([]);

    const devices = this.fetchForPage(
      this.groupId,
      filterQuery,
      dataSourceModifier.pagination
    );
    const filtered = this.fetchCount(this.groupId, filterQuery);
    const total = this.fetchCount(this.groupId, allQuery);
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
    return this.inventoryService.childAssetsList(parentReference, filters);
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
    return this.inventoryService
      .childAssetsList(parentReference, filters)
      .then((result) => result.paging.totalPages);
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
