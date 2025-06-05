export interface IPagination {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface IRequestGet {
  page: number;
  limit: number;
  userId?: number;
}
