<template>
  <div class="search">
    <c-search
      v-model="searchForm"
      :config="search"
      @onSearch="onSearch"
    ></c-search>
  </div>
  <div class="table" v-loading="loading">
    <c-table :config="props.config" :data="list"> </c-table>
    <template v-for="item in props.config.columns">
      <div v-if="item.slot" :slot="item.slot">
        {{ item.slot }}
        <slot :name="item.slot"></slot>
      </div>
    </template>
  </div>
  <div class="pagination">
    <el-pagination
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      v-model::current-page="pagination.current"
      @update:current-page="pagination.onChangePage"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, unref, useSlots } from 'vue';
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

const { loading, list, onSearch, pagination } = useTable(load);

const { searchForm } = useSearch(props.search);

onMounted(() => {
  onSearch();
  console.log(props.config);
});
const slots = useSlots();
console.log(`slots`);
console.log(slots);
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
</style>
