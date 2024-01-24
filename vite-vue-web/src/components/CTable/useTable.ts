import { IPaging } from '@/utils/http/types';
import { ref } from 'vue';
import usePagination from './usePagination';

export default (
  loadFn: (current: number, size: number) => Promise<IPaging<any>>,
) => {
  const [pagination, onChangePage] = usePagination(() => onLoad());

  const loading = ref(false);
  const list = ref<any[]>([]);

  const onLoad = async () => {
    loading.value = true;
    const res = await loadFn(pagination.current, pagination.size);
    list.value = res.list;
    pagination.total = res.total || list.value.length;
    loading.value = false;
  };

  const onSearch = () => {
    onChangePage(1);
  };

  return {
    list,
    loading,
    onSearch,
    pagination,
  };
};
