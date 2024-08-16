export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type TNewUser = Omit<IUser, "id"> & { confirmPassword: string };

export type TUpdateUser = Partial<Omit<IUser, "id" | "password">>;

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type TUserLoginBody = Pick<IUser, "email" | "password">;
