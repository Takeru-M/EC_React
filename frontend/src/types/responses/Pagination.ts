export default interface Pagination<T> {
  data: T[];
  from?: number | null;
  to?: number | null;
  total: number;
  per_page: number;
  current_page: number;
  first_page_url?: string | null;
  last_page?: number | null;
  last_page_url?: string | null;
  next_page_url?: string | null;
  path?: string | null;
  prev_page_url?: string | null;
}
