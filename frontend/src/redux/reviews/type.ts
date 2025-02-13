export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewState {
  reviews: Review[];
  reviews_for_display: FetchedReviewResponse[];
  page: number;
  pageSize: number;
}

export interface FetchedReviewResponse {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user_login_name: string;
}
