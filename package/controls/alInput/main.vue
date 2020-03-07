<template>
  <div class="al-input">
    <div class="al-input-content" v-if="type === 'service'">
      <service-input
        ref="input"
        :value="value"
        v-bind="{placeholder:getPlaceholder('input', label), ...$attrs}"
        v-on="$listeners">
      </service-input>
    </div>
    <div class="al-input-content" v-else :style="{width: width + 'px'}">
      <el-input
        ref="input"
        :value="value"
        v-bind="{
          placeholder: getPlaceholder('input', label),
          type: type !== 'number' ? type : undefined,
          maxlength: type === 'textarea' ? 200 : null, ...$attrs
        }"
        @input="change"
        v-on="filterListeners">
        <!-- <div v-if="suffixLabel" class="suffix-label" slot="suffix">{{suffixLabel}}</div> -->
        <template v-for="key in Object.keys($slots)" :slot="key">
          <slot :name="key"></slot>
        </template>
      </el-input>
      <!-- <div class="al-input-subscript" v-if="type === 'textarea' && subscript">
        <span>{{value ? value.length : 0}}/{{($attrs.maxlength) || 200}}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
  import placeholder from '../../../src/mixins/placeholder';
  import serviceInput from './serviceInput';
  const defaultReg = /(( )|([\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[9|E]\u3030|\uA9|\uAE|\u3030))+/;
  export default {
    mixins: [placeholder],
    name: 'al-input',
    props: {
      isAutoFocus: {
        type: Boolean,
        default: false
      },
      suffixLabel: {
        type: String
      },
      label: {
        type: String,
        default: '内容'
      },
      value: {
        default: ''
      },
      type: {
        default: 'input'
      },
      subscript: {
        default: true
      },
      width: {
        type: Number,
        default: null
      },
      height: {
        type: Number,
        default: null
      },
      reg: {},
      default: {},
    },
    data() {
      return {
        query: '',
      };
    },
    components: {
      serviceInput
    },
    mounted() {
      if (!['', null].includes(this.value)) {
        this.change(this.value + '');
      } else if (this.default !== undefined) {
        this.change(this.default + '');
      }
      if (this.height !== null && this.type === 'textarea') {
        this.$el.querySelector('.al-input-content textarea').style.height = this.height + 'px';
      }
      if (this.isAutoFocus) {
        this.focus();
      }
    },
    computed: {
      filterListeners() {
        return ['input'].reduce((sum, key) => {
          delete sum[key];
          return sum;
        }, {...this.$listeners});
      },
    },
    methods: {
      focus() {
        this.$refs.input.focus();
      },
      checkReg(val) {
        if (!this.reg) return true;
        if (this.reg.constructor === RegExp) {
          return this.reg.test(val);
        } else if (this.reg.constructor === Array || this.reg.constructor === Object) {
          for (let key in this.reg) {
            if (!this.reg[key].test(val)) return false;
          }
          return true;
        } else {
          return true;
        }
      },
      change(value) {
        let query = value;
        if (this.type === 'number') {
          query = query.replace(/\D/g, '');
          query = typeof query === 'string' && query !== '' ? Number(query) : query;
        } else if (this.type === 'float') {
          query = query.replace(/[^(0-9)|.]/g, '');
          let temp = query.split('.');
          temp = temp.slice(0, 2);
          temp[0] = temp[0].slice(0, 9);
          temp[1] ? temp[1] = temp[1].slice(0, 2) : '';
          query = temp.join('.');
          // query = typeof query === 'string' && query !== '' ? Number(query) : query;
        } else if (['input', 'textarea'].includes(this.type)) {
          query = query.replace(defaultReg, '');
        }
        if (!this.checkReg(query)) {
          query = this.checkReg(this.value) ? this.value : '';
        }
        // 高版本的element-ui的input组件没有setCurrentValue方法，在此避免报错
        try {
          if (query !== value && this.$refs.input) {
            this.$refs.input.setCurrentValue(query);
          }
        } catch (e) {}
        this.$emit('input', query);
      },
    }
  };
</script>
<style lang="less">
</style>
