<template>
  <el-switch
    :value="value"
    v-bind="$attrs"
    v-on="$listeners">
  </el-switch>
</template>

<script>
export default {
  name: 'al-switch',
  props: {
    value: {},
    default: {
      type: Boolean,
      default: true
    },
  },
  mounted() {
    this.change(typeof this.value === 'boolean' ? this.value : this.default);
  },
  methods: {
    change(value) {
      if (this.value !== value) {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
  },
};
</script>
