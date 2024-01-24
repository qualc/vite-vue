import { http } from '@/utils/http';

export const saveNoticeList = () => {
  return http.post(`/config/banner`, { id: 1 });
};
