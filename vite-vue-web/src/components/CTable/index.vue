<template>
  <el-table
    :data="props.data"
    :border="defaultConfig.border"
    :stripe="defaultConfig.stripe"
    :align="defaultConfig.align"
    :row-key="props.config.rowKey"
  >
    <el-table-column
      v-for="(item, index) in props.config?.columns"
      :width="item.width || defaultColumn.width"
      :type="item.type"
      :key="index"
      :align="item.align || defaultConfig.align"
    >
      <template #header>
        {{ item.label }}
      </template>
      <template #default="scope" v-if="!item.type">
        <template v-if="item.slot">
          <slot :name="item.slot" :row="scope.row" :$index="scope.$index" />
        </template>
        <template v-else>
          {{ format(scope, item) }}
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ITableColumn, ITableConfig } from '.';
import { isPlainObject } from '@/utils/valid';

const props = defineProps<{
  /** 列配置 */
  config: ITableConfig;
  data: any[];
}>();

const defaultColumn = ref<Partial<ITableColumn>>({
  width: '',
  fixed: false,
});

const defaultConfig = ref<ITableConfig>({
  columns: [],
  align: 'center',
  border: true,
  stripe: true,
});

// const slots = useSlots();

const format = (scope: any, item: ITableColumn) => {
  const value = scope.row[item.props!] || item.props;
  if (item.formatter && typeof item.formatter === 'function') {
    return item.formatter(value, scope.row, scope.$index);
  } else if (item.formatter && isPlainObject(item.formatter)) {
    return item.formatter[value] || value;
  }
  return value;
};
</script>

<style lang="scss" scoped></style>
