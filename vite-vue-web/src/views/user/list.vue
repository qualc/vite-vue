<template>
  <c-page :search="search" :config="config" :request="getUserList">
    <template #operate="scope">
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
    </template>
  </c-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IUserInfo } from '@/models/user';
import { getUserList } from '@/api/users';
import { ITableConfig } from '@/components/CPage';
import { ISearchConfig, ISearchType } from '@/components/CSearch';

const config = ref<ITableConfig>({
  columns: [
    {
      props: 'id',
      width: 60,
    },
    {
      label: 'Name',
      props: 'username',
    },
    {
      label: 'Role',
      props: 'roleName',
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

const handleCreate = () => {};
const handleEdit = (row: IUserInfo) => {
  console.log(row);
  console.log(row.id, row.username);
};
const handleDelete = (row: IUserInfo) => {
  console.log(row.id, row.username);
};
</script>
