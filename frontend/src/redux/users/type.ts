export interface User {
  id: number;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  email: string;
  phone_number: string;
  postal_code: string;
  address: string;
};

export interface UserState {
  user: User | null;
  accessToken: string | null;
};

export interface UserResponse {
  data: User | null;
  access_token: string | null;
};

export type Action = {
  type: string;
  payload: any;
};
