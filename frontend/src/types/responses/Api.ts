export interface ApiResponse<T> {
  data?: T; // 成功時のデータ
  message?: string; // メッセージ（エラー時も含む）
  errors?: Record<string, string[]>; // バリデーションエラー用
}

export interface ApiPaginationResponse<T> {
  data?: T[]; // 成功時のデータ
  total?: number; // データの総数
  per_page?: number; // ページあたりのデータ数
  current_page?: number; // 現在のページ
  message?: string; // メッセージ（エラー時も含む）
  errors?: Record<string, string[]>; // バリデーションエラー用
}
