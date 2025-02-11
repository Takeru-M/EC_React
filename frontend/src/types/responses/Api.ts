export interface ApiResponse<T> {
  data?: T; // 成功時のデータ
  message?: string; // メッセージ（エラー時も含む）
  errors?: Record<string, string[]>; // バリデーションエラー用
}
