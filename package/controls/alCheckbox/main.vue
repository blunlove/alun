<template>
  <el-checkbox-group
    :value="value"
    v-bind="$attrs"
    v-on="filterListeners"
    @input="change">
    <el-checkbox
      v-for="item in options"
      v-bind="subAtrrs"
      :disabled="item.disabled"
      :label="item[keyMap_.value] || item[keyMap_.label]"
      :key="item[keyMap_.value] || item[keyMap_.label]">
      {{item[keyMap_.label]}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import choice from '../../../src/mixins/choice';
// import { hasValue_arr } from "djcpsweb-utils";

export default {
  name: 'al-check-box',
  mixins: [choice],
  props: {
    value: {
      default: () => []
    },
    default: {
      default: () => []
    },
  },
  computed: {
    filterListeners() {
      return ['input'].reduce((sum, key) => {
        delete sum[key];
        return sum;
      }, {...this.$listeners});
    },
  },
  mounted() {
    if (!hasValue_arr(this.value) && this.default.length) {
      this.change(this.default, true);
    }
  },
  methods: {
    change(val, bool) {
      this.$emit('input', val);
      bool && this.$emit('change', val);
    }
  },
};
</script>
