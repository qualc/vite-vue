import { PropType, defineComponent, ref, watch } from 'vue';
import { ISearchConfig, ISearchType } from '../type';
// 导入才能自动注入对应的样式
import {
  ElForm,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
} from 'element-plus';
import './index.scss';

const defaultConfig = {
  width: 120,
  rangeSeparator: '~',
};

export default defineComponent({
  props: {
    config: Array as PropType<ISearchConfig>,
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'onSearch'],
  setup(props, { emit }) {
    const { config, modelValue } = props;

    // 防止表单信息时时变化
    const formData = ref({ ...modelValue });

    watch(
      () => modelValue,
      (val) => {
        formData.value = { ...val };
      },
      {
        deep: true,
        immediate: true,
      },
    );
    const onSearch = () => {
      const value = { ...formData.value };
      emit('update:modelValue', value);
      emit('onSearch', value);
    };

    return () => {
      const formItems = config?.map((item) => {
        let input = null;
        switch (item.type) {
          case ISearchType.input:
            input = (
              <ElInput
                v-model={formData!.value[item.props]}
                placeholder={item.placeholder}
              />
            );
            break;
          case ISearchType.select:
            const options = item.options.map((option) => (
              <ElOption
                key={option.value.toString()}
                label={option.label}
                value={option.value}
              />
            ));
            input = (
              <ElSelect
                v-model={formData!.value[item.props]}
                placeholder={item.placeholder}
              >
                {options}
              </ElSelect>
            );
            break;
          case ISearchType.datePicker:
            input = (
              <ElDatePicker
                v-model={formData!.value[item.props]}
                placeholder={item.placeholder}
                type="date"
              ></ElDatePicker>
            );
            break;
          case ISearchType.rangePicker:
            input = (
              <ElDatePicker
                v-model={formData!.value[item.props]}
                placeholder={item.placeholder}
                range-separator={
                  item.rangeSeparator || defaultConfig.rangeSeparator
                }
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
              ></ElDatePicker>
            );
        }

        return (
          <el-form-item
            prop={item.props}
            label={item.label || ''}
            width={item.width || defaultConfig.width}
          >
            {input}
          </el-form-item>
        );
      });
      return (
        <ElForm inline model={formData} class="custom-search-form">
          {formItems}
          <el-form-item>
            <el-button type="primary" onClick={onSearch}>
              查询
            </el-button>
          </el-form-item>
        </ElForm>
      );
    };
  },
});
