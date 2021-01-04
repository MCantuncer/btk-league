export interface IPaginationResponse<TItem> {
  page: number;
  limit: number;
  count: number;
  data: TItem[];
  hasNext: boolean;
}
