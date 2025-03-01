export type ForgotDataType = {
  email: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type RegisterDataType = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export type ResetDataType = {
  newPassword: string;
  confirmedPassword: string;
  general?: string;
};
