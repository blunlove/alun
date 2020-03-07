<template>
  <div class="al-item-box" :class="setVerticalAlign">
    <div
      class="al-item-box-label"
      v-if="label"
      :title="label + labelSuffix"
      :style="{width: labelWidth + 'px', 'text-align': labelPosition}">
      <span>{{label}}</span><span>{{labelSuffix}}</span>
    </div><div
     class="al-item-box-value" ref="boxValue">
      <slot>
        <component :is="getComponent($attrs)" :value="value" :label="label" v-on="$listeners" v-bind="attrs"></component>
      </slot>
    </div>
  </div>
</template>

<script>
  import typeMapPolicy from '../../mixins/typeMapPolicy';
  export default {
    name: 'alItemBox',
    mixins: [typeMapPolicy],
    props: {
      value: {
        default: ''
      },
      labelSuffix: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: Number,
        default: null
      },
      labelPosition: {
        type: String,
        default: null
      },
      label: {
        default: null
      },
      attrs: {},
    },
    data() {
      return {
        setVerticalAlign: null
      };
    },
    mounted() {
      this.setVerticalAlign = this.$refs.boxValue.offsetHeight % 22 === 0 ? '' : 'al-item-box-center';
    }
  };
</script>
