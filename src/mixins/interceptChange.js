export default {
  props: {
    beforeChange: {
      type: Function
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', this.beforeChange ? this.beforeChange(val) : val);
    }
  }
};
