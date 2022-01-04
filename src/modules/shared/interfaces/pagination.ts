export interface IPagination {
  docs?: any[] | any;
  totalDocs?: number;
  limit?: number;
  page?: number | undefined;
  nextPage?: number | null | undefined;
  prevPage?: number | null | undefined;
  totalPages?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  pagingCounter?: number;
  meta?: any;
}
