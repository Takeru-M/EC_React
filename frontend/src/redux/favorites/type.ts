export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface FavoriteState {
  favorites: Favorite[];
  favorites_for_screen: FavoriteResponse[];
  favorite: Favorite | null;
  isLoading: boolean;
}

export interface FavoriteResponse {
  id: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number,
    name: string,
    price: number,
    stock: number,
    image: string,
  };
}
