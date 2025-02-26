export interface User {
  id: number;
  login_name: string;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  email: string;
  phone_number: string;
  postal_code: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export interface UserState {
  users: User[];
  user: User | null;
  isSignin: boolean;
  address: Address | null;
  addresses: Address[];
};

export interface UpdateUserState {
  login_name: string;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  email: string;
  phone_number: string;
  postal_code: string;
  address: string;
}

export interface Signin {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Auth {
  login_name: string;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  email: string;
  phone_number: string;
  postal_code: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface Address {
  id: number;
  user_id: number;
  name: string;
  postal_code: string;
  address: string;
  country: string;
  phone_number: string;
  is_default: boolean;
}

export const defaultAddress: Address = {
  id: 0,
  user_id: 0,
  name: '',
  postal_code: '',
  address: '',
  country: '',
  phone_number: '',
  is_default: false,
}


export type Action = {
  type: string;
  payload: any;
};
