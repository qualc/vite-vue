<template>
  <c-page
    ref="tableRef"
    :search="search"
    :config="config"
    :request="getMenuList"
  >
    <template #operate="scope">
      <el-button type="primary" @click="handleCreate(scope.row)">
        新增
      </el-button>
      <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
    </template>
  </c-page>
  <edit
    v-model:visible="editFormData.visible"
    :data="editFormData.data"
    :type="editFormData.type"
    @on-ok="handleOk"
  />
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { deleteMenu, getMenuList } from '@/api/menu';
import { ITableConfig } from '@/components/CPage';
import { ISearchConfig, ISearchType } from '@/components/CSearch';
import edit from './edit.vue';
import { EEditType, IEditProps, IMenuItem, MenuLabelMap } from './constant';
import { CTableInstance } from '@/components/CTable';
import { ElMessage, ElMessageBox } from 'element-plus';

const config = ref<ITableConfig>({
  rowKey: 'id',
  columns: [
    {
      props: '',
      width: 60,
    },
    {
      props: 'id',
      width: 60,
    },
    {
      label: '名称',
      props: 'name',
    },
    {
      label: '地址',
      props: 'path',
    },
    {
      label: '类型',
      props: 'type',
      formatter: MenuLabelMap,
    },
    {
      label: 'Operate',
      slot: 'operate',
      width: 250,
    },
  ],
});

const search = ref<ISearchConfig>([
  {
    type: ISearchType.input,
    label: 'Name',
    props: 'username',
  },
]);
const tableRef = ref<CTableInstance>();

const editFormData = reactive<IEditProps>({
  visible: false,
  data: undefined,
  type: EEditType.create,
});

const onOpenEditDialog = (row: IMenuItem, type: EEditType) => {
  editFormData.data = row;
  editFormData.type = type;
  editFormData.visible = true;
};

const handleCreate = (row: IMenuItem) => {
  onOpenEditDialog(row, EEditType.create);
};
const handleEdit = (row: IMenuItem) => {
  onOpenEditDialog(row, EEditType.edit);
};

const handleDelete = async (row: IMenuItem) => {
  const action = await ElMessageBox.confirm(`确认删除${row.name}吗?`, '提示', {
    cancelButtonText: '取消',
    confirmButtonText: '确认',
    type: 'warning',
  }).catch((action) => action);

  if (action === 'confirm') {
    await deleteMenu(row.id);
    ElMessage.success('删除成功');
    handleOk();
  }
};

const handleOk = () => {
  tableRef.value?.refresh();
};
</script>
./constant
