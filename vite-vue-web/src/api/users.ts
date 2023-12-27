import { IUserInfo } from '@/models/user';
import { http } from '@/utils/http';
import { IPaging, VPagination } from '@/utils/http/types';

export interface ILoginParams {
  // 用户名
  username: string;
  // 密码
  password: string;
}

export interface IUserListBody {
  username: string;
}

export const login = (params: ILoginParams) => {
  return http.post<ILoginParams, IUserInfo>('/user/login', params);
};

export const getUserInfo = (id: number) => {
  return http.get<Omit<IUserInfo, 'token'>>(`/user/${id}`);
};

export const getUserList = (body: VPagination<IUserListBody>) => {
  return http.post<VPagination<IUserListBody>, IPaging<IUserInfo>>(
    `/user`,
    body,
  );
};
