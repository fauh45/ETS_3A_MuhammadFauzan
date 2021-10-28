export type Staff = {
  staff_id: number;
  first_name: string;
  last_name: string;
  address_id: number;
  email: string | null;
  store_id: number;
  active: boolean;
  username: string;
  password: string | null;
  picture: string | null;
  store_connected: boolean
};
