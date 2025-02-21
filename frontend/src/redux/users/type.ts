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
};

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

export type Action = {
  type: string;
  payload: any;
};
