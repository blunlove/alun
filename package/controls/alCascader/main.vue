<template>
  <div class="al-cascader">
    <div class="al-cascader-content" :style="{width: width + 'px'}">
      <el-cascader
        :value="value_"
        ref="elCascader"
        @change="change"
        :props="props_"
        :options="this.props_.lazy ? options_: options"
        v-bind="getBind()"
        v-on="$listeners">
      </el-cascader>
    </div>
  </div>
</template>

<script>
import elCascader from './elCascader';
const DEFAULT_ATTRS = {
  'collapse-tags': true
};
function getDefaultProps(apis, value) {
  return {
    lazy: true,
    checkStrictly: true,
    value: 'fixValue',
    lazyLoad(node, resolve) {
      const { level } = node;
      let api = apis[level];
      if (typeof api === 'function') {
        if (node.children && node.children.length > 0) {
          resolve();
        } else {
          if (value.length > 0 && level === 0) {
            resolve();
          } else {
            api(node.data).then(res => {
              let _nodeData = node.data ? node.data : {};
              resolve(res.map(item => ({
                ...item,
                leaf: level === apis.length - 1,
                fixValue: _nodeData.fixValue ? _nodeData.fixValue + '-' + item.value : item.value
              })));
            }).catch(() => {
              resolve([]);
            });
          }
        }
      }
    }
  };
}
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
const loopOptions = (options, father = null) => {
  return options.map(opt => {
    opt.fixValue = father ? String(father) + '-' + opt.value : String(opt.value);
    if (opt.children) {
      opt.children = loopOptions(opt.children, opt.fixValue);
    }
    return opt;
  });
};
export default {
  name: 'alCascader',
  props: {
    apiArray: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      default: null
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  components: {
    elCascader
  },
  data() {
    return {
      options_: [],
      props_: Object.assign(getDefaultProps(this.apiArray, this.value), this.props)
    };
  },
  computed: {
    options() {
      if (!this.props_.lazy) {
        return loopOptions(this.$attrs.options);
      }
    },
    value_() {
      return this.value.reduce((sum, val) => {
        return sum.concat(sum.length === 0 ? val : sum[sum.length - 1] + '-' + val);
      }, []);
    },
  },
  mounted () {
    if (this.props_.lazy && this.value && this.value.length > 0) {
      if (this.value.length !== this.apiArray.length) {
        return this.$message.error('传入api数组长度和绑定值长度不一致');
      }
      pipeAsyncFunctions(...this.apiArray.map((api, index) => {
        return father => api(father).then(res => {
          if (index === 0) {
            this.options_ = res.map(item => ({
              ...item,
              children: [],
              fixValue: item.value
            }));
            father = this.options_.find(option => option.value === this.value[index]);
          } else {
            if (!father) return;
            father.children = res.map(item => ({
              ...item,
              children: [],
              leaf: index === this.value.length - 1,
              fixValue: father.fixValue + '-' + item.value
            }));
            father = father.children.find(option => option.value === this.value[index]);
          }
          return father;
        });
      }))();
    }
  },
  methods: {
    change() {
      let selectedNodes = this.getCheckedNodes();
      let selected = this.props_.multiple ? selectedNodes.map(array => array.map(item => item.value)) : selectedNodes.map(item => item.value);
      this.$emit('input', selected);
      this.$emit('select', selectedNodes);
    },
    getCheckedNodes() {
      let menus = this.$refs.elCascader.panel.menus;
      let checkedValue = this.$refs.elCascader.checkedValue;
      function filterMenus(val, index) {
        if (menus[index]) {
          let temp = menus[index].find(item => item.value === val);
          return temp ? temp.data : {};
        } else {
          return {};
        }
      }
      if (this.props_.multiple) {
        return checkedValue.map(array => array.map(filterMenus));
      } else {
        return checkedValue.map(filterMenus);
      }
    },
    getBind() {
      return {
        ...DEFAULT_ATTRS,
        ...this.$attrs
      };
    }
  }
};
</script>
