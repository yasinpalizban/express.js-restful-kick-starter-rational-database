import { IPagination } from '@/modules/shared/interfaces/pagination';

export function paginationFields(limit: number, page: number, total: number): IPagination {
  return {
    limit: limit,
    page: page,
    totalPages: Math.ceil(total / limit),
    pagingCounter: page,
    nextPage: page >= Math.ceil(total / limit) ? page : page + 1,
    prevPage: page <= Math.ceil(total / limit) ? page - 1 : page,
    hasNextPage: page >= Math.ceil(total / limit),
    hasPrevPage: page <= Math.ceil(total / limit),
  };
}
