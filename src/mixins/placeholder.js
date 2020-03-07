const TYPE_MAP = {
  input: '输入',
  select: '选择'
};
export default {
  methods: {
    getPlaceholder(type, label) {
      return `请${TYPE_MAP[type]}${(label || '').replace(/[:：] *$/, '')}`;
    }
  }
};
