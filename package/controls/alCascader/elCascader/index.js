import { Cascader } from 'element-ui';
import ElCascaderPanel from './cascader-panel';
export default {
  extends: Cascader,
  components: {
    ElCascaderPanel
  },
  watch: {
    checkedValue(val, newVal) {
      if (val === newVal) return;
      const { dropDownVisible } = this;
      const { checkStrictly, multiple } = this.config;
      this.computePresentContent();
      if (!multiple && !checkStrictly && dropDownVisible) {
        this.toggleDropDownVisible(false);
      }
      this.$emit('input', val);
      this.$emit('change', val);
      this.dispatch('ElFormItem', 'el.form.change', [val]);
    }
  }
};
