import { IPaging } from '@/utils/http/types';
import { ref } from 'vue';

export default (
  loadFn: (current: number, size: number) => Promise<IPaging<any>>,
) => {
  const loading = ref(false);
  const current = ref(1);
  const size = ref(10);
  const total = ref(0);
  const list = ref<any[]>([]);

  const onLoad = async () => {
    loading.value = true;
    const res = await loadFn(current.value, size.value);
    list.value = res.list;
    total.value = res.total;
    loading.value = false;
  };

  const onChangePage = async (currentValue: number) => {
    current.value = currentValue;
    onLoad();
  };
  const onChangeSize = async (currentValue: number) => {
    size.value = currentValue;
    onLoad();
  };
  const onSearch = () => {
    console.log('##### onSearch');
    current.value = 1;
    onLoad();
  };

  return {
    loading,
    current,
    size,
    total,
    list,

    onChangePage,
    onChangeSize,
    onSearch,
  };
};
