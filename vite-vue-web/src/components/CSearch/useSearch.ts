import { ref } from 'vue';
import { ISearchConfig } from './type';

export default (config: ISearchConfig) => {
  const unref: Record<string, any> = {};
  config.forEach((item) => {
    unref[item.props] = item.defaultValue || '';
  });

  const searchForm = ref<typeof unref>(unref);

  return {
    searchForm,
  };
};
