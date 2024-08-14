export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type TNewUser = Omit<IUser, "id"> & { confirmPassword: string };

export type TUserLoginBody = Pick<IUser, "email" | "password">;
