import controls from '../../package/controls';
function handleComponent(obj) {
  let {component, render} = obj;
  if (render) {
    return {
      functional: true,
      render
    };
  } else {
    return component;
  }
};

export default {
  props: {
    typeMap: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _typeMap() {
      return Object.assign({}, this.typeMap);
    }
  },
  methods: {
    getComponent(obj = {}) { 
      let {type} = obj;
      return type === 'custom' && handleComponent(obj) || type;
    },
  },
  components: {
    ...controls
  }
};

