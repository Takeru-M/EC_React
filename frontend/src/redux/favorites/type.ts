export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
}

export interface FavoriteState {
  favorites: Favorite[];
  favorite: Favorite | null;
}
