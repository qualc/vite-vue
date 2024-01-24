<template>
  <el-dialog
    :model-value="props.visible"
    :title="type === EEditType.create ? '新增菜单' : '修改菜单'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="上级菜单">
        <el-input v-model="formData.parentName" disabled />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="地址" prop="path">
        <el-input v-model="formData.path" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="formData.type"
          placeholder="请选择类型"
          style="width: 240px"
        >
          <el-option
            v-for="(key, value) in MenuLabelMap"
            :key="value"
            :label="key"
            :value="value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleSaveOrUpdate">
          {{ type === EEditType.create ? '新增' : '确定' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watch } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import {
  EEditType,
  IEditProps,
  IMenuItem,
  IFormRule,
  MenuLabelMap,
} from './constant';
import { saveMenu, updateMenu } from '@/api/menu';

const props = withDefaults(defineProps<IEditProps>(), {
  visible: false,
  data: undefined,
  type: EEditType.create,
});

const formRef = ref<FormInstance>();
const formData = reactive<Partial<IMenuItem>>({});
const rules = reactive<FormRules<IFormRule>>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
});

const emits = defineEmits(['update:visible', 'onOk']);

const handleClose = (done: () => void) => {
  emits('update:visible', false);
  done();
  onReset();
};

const handleSaveOrUpdate = async () => {
  try {
    const result = await formRef.value?.validate();
    if (!result) {
      return false;
    }
    await (props.type === EEditType.create ? onSave() : onUpdate());
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e.message);
  } finally {
    emits('onOk', toRaw(formData));
    emits('update:visible', false);
    onReset();
  }
};

const onReset = () => {
  formRef.value?.clearValidate();
  formRef.value?.resetFields();
};
const onSave = async () => {
  return await saveMenu(formData).catch(() => {
    ElMessage.error('保存失败');
  });
};
const onUpdate = async () => {
  return await updateMenu(formData.id!, formData).catch(() => {
    ElMessage.error('编辑失败');
  });
};
watch(
  () => props.data,
  (data) => {
    if (props.type === EEditType.create) {
      formData.parentId = data?.id;
      formData.parentName = data?.name;
    } else {
      Object.assign(formData, data);
      formData.parentName ||= '-';
    }
    console.log(data);
  },
);
</script>

<style scoped lang="scss">
.dialog-footer {
  text-align: center;
}
</style>
