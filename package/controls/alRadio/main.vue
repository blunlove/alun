<template>
  <el-radio-group
    :value="value"
    v-bind="$attrs"
    v-on="filterListeners"
    @input="change">
    <el-radio
      v-for="item in options"
      v-bind="subAtrrs"
      :disabled="item.disabled"
      :label="(item[keyMap_.value] === 0 || item[keyMap_.value]) ? item[keyMap_.value] : item[keyMap_.label]"
      :key="(item[keyMap_.value] === 0 || item[keyMap_.value]) ? item[keyMap_.value] : item[keyMap_.label]">{{item[keyMap_.label]}}</el-radio>
  </el-radio-group>
</template>

<script>
import choice from '../../../src/mixins/choice';
export default {
  name: 'al-radio',
  mixins: [choice],
  props: {
    value: {},
    default: {}
  },
  data() {
    return {
      query: '',
    };
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
    if (this.value === undefined && this.default !== undefined) {
      this.change(this.default, true);
    }
    // this.query = this.value || this.default;
  },
  methods: {
    change(val, bool) {
      this.$emit('input', val);
      bool && this.$emit('change', val);
    },
  },
};
</script>
