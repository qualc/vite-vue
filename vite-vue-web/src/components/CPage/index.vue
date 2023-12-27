<template>
  <div class="search">
    <c-search
      v-model="searchForm"
      :config="search"
      @onSearch="onSearch"
    ></c-search>
  </div>
  <div class="table" v-loading="loading">
    <c-table :config="props.config" :data="list"></c-table>
  </div>
  <div class="pagination">
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      v-model::current-page="current"
      @update:current-page="onChangePage"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, unref } from 'vue';
import useTable from '../CTable/useTable';
import useSearch from '../CSearch/useSearch';
import { ITableConfig } from '../CTable';
import { ISearchConfig } from '../CSearch';

const props = defineProps<{
  /** 表格列配置 */
  config: ITableConfig;
  /** 搜索项配置 */
  search: ISearchConfig;
  /** 请求函数 */
  request: any;
}>();

const load = async (current: number, size: number) => {
  return props.request({ current, size, ...unref(searchForm) });
};

const { loading, list, size, total, current, onChangePage, onSearch } =
  useTable(load);

const { searchForm } = useSearch(props.search);

onMounted(() => {
  onSearch();
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
</style>
