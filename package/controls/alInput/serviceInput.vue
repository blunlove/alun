<template>
  <div class="service-input">
    <el-autocomplete
      ref="autocomplete"
      :value="value"
      :fetch-suggestions="getOptions"
      v-bind="{...$attrs, valueKey}"
      v-on="$listeners"
      @select="handleSelect">
      <template slot-scope="{ item }" v-if="component">
        <component :is="component" :item="item"></component>
      </template>
    </el-autocomplete>
  </div>
</template>
<script>
  // import {handleComponent} from 'djweb/src/utils/handleComponent';

  export default {
    name: 'serviceInput',
    props: {
      value: {},
      service: {
        type: Function,
        default: () => {},
      },
      width: {
        type: Number,
        default: null,
      },
      valueKey: {
        type: String,
        default: 'value',
      },
    },
    data() {
      return {
        options: [],
      };
    },
    computed: {
      component() {
        return handleComponent({
          component: this.$attrs.component,
          render: this.$attrs.render,
        });
      },
    },
    methods: {
      focus() {
        this.$refs.autocomplete.$refs.input.focus();
      },
      getOptions(val, cb) {
        this.api().then(res => {
          cb(val ? res.filter(item => item[this.valueKey].includes(val)) : res);
        });
      },
      api() {
        if (this.options.length > 0) {
          return Promise.resolve(this.options);
        } else {
          return this.service();
        }
      },
      handleSelect(val) {
        this.$emit('input', val[this.valueKey]);
      },
    },
  };
</script>
