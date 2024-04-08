export type GetAllUsers = {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: boolean;
};

export type CreateUser = {
  name: string;
  phone: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type UpdateUser = {
  id?: number;
  name: string;
  email: string;
  phone: string;
};
