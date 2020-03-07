<template>
  <el-select
    :style="{width: width+'px'}"
    :value="query"
    size="small"
    :multiple="type === 'multiple'"
    v-bind="getBind()"
    :class="getSelectWrapClass()"
    v-on="filterListeners"
    @input="valueChange">
    <el-option
      v-for="(item, index) in options_"
      v-bind="subAtrrs"
      :key="getLabel(item) + getValue(item) + index"
      :label="getLabel(item)"
      :value="getValue(item)"
      :disabled="item.disabled"></el-option>
  </el-select>
</template>

<script>
  import placeholder from '../../../src/mixins/placeholder';
  import choice from '../../../src/mixins/choice';

  const DEFAULT_SELECT_ATTRS = {
    clearable: true,
    size: 'medium',
  };
  export default {
    name: 'alSelect',
    props: {
      value: {},
      label: {
        default: null,
      },
      service: {
        default: null,
      },
      type: {
        default: 'single',
      },
      autoFormat: {
        type: Boolean,
        default: true,
      },
      // 在用service获取options时搭配使用，options为本地数据时，使用default绑定
      selectFirst: {
        type: Boolean,
        default: false,
      },
      width: {
        type: Number,
        default: null,
      },
      bindObject: {
        type: Boolean,
        default: false,
      },
      default: {
        default: undefined,
      },
    },
    mixins: [
      placeholder,
      choice,
    ],
    computed: {
      query: {
        get() {
          if (this.type === 'multiple') {
            return Array.isArray(this.value) && this.value.length ? this.value : this.default || [];
          } else {
            return this.value !== undefined ? this.value : this.default;
          }
        },
        set(val) {
          return val;
        }
      },
      options_: {
        get() {
          return this.options || [];
        },
        set(val) {
          return val;
        }
      },
      filterListeners() {
        return ['input'].reduce((sum, key) => {
          delete sum[key];
          return sum;
        }, {...this.$listeners});
      },
    },
    methods: {
      //多选时，加上特殊类名，防止内容过长时超出输入框
      getSelectWrapClass() {
        if (this.type === 'multiple') {
          if (this.$attrs['collapse-tags']) {
            return 'select-ellipsis-multi-col';
          } else {
            return 'select-ellipsis-multi';
          }
        }
      },
      getLabel(item) {
        if (item[this.keyMap_.label] !== undefined) {
          return item[this.keyMap_.label];
        } else if (item[this.keyMap_.value] !== undefined) {
          return item[this.keyMap_.value];
        } else {
          return item;
        }
      },
      getValue(item) {
        if (this.bindObject) {
          return item;
        } else if (item[this.keyMap_.value] !== undefined) {
          return item[this.keyMap_.value];
        } else if (item[this.keyMap_.label] !== undefined) {
          return item[this.keyMap_.label];
        } else {
          return item;
        }
      },
      valueChange(val) {
        this.$emit('input', val);
      },
      getOptions(val) {
        if (!this.service) return;
        this.options_ = [];
        return this.service(val).then(res => {
          this.options_ = res;
          this.$nextTick(this.getFirstValue);
        });
      },
      getBind() {
        return {
          ...DEFAULT_SELECT_ATTRS,
          placeholder: this.getPlaceholder('select', this.label),
          valueKey: this.bindObject ? this.keyMap_.value : undefined,
          ...this.$attrs,
        };
      },
      getFirstValue() {
        if (this.selectFirst) {
          if (this.bindObject) {
            this.query = this.options_[0];
          } else {
            this.query = this.options_[0] ? this.options_[0][this.keyMap_.value] : undefined;
          }
          this.$emit('change-default', this.query);
          this.valueChange(this.query);
        }
      }
    },
    mounted() {
      if (this.value !== this.query) {
        this.$emit('input', this.query);
      }
      if (this.autoFormat) {
        this.getOptions();
      } else {
        this.getFirstValue();
      }
    },
  };
</script>
