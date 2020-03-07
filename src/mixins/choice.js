let defaultKeyMap = {
  label: 'label',
  value: 'value',
};
export default {
  props: {
    keyMap: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value',
      })
    },
    options: {
      type: Array,
      default: () => []
    },
    subAtrrs: {
      default: () => ({})
    }
  },
  computed: {
    keyMap_() {
      return {...defaultKeyMap, ...this.keyMap};
    }
  },
};
