export interface User {
  id: number;
  name: string;
  email: string;
};

export interface UserState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
};

export interface loginResponse {
  user: User | null;
  access_token: string | null;
};

export interface fetchUserResponse {
  user: User | null;
};

export type Action = {
  type: string;
  payload: any;
};
