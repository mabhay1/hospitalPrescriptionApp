export interface ILoginResponse {
  token: string
  expiresOn: string;
  user: IUserResponse
}

export interface IUserResponse {
  id: number;
  fullName: string;
  email: string;
  mobileNo: string;
  password: string;
  projectName: string;
  roleId: number;
  roleName: string;
  isActive: boolean;
  createdOn: string;
}
export interface IUserModel {
  email: string;
  fullName: string;
  mobileNo: string;
  password: string;
  roleName: string;
  isActive: boolean;
}
