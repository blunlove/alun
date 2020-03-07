<template>
  <div class="al-waterfall-box">
    <div class="al-waterfall-box-column" v-for="n in columnNumber" :key="n" :style="{width: columnWidth + 'px'}">
      <div class="al-waterfall-box-item-wrap" v-for="_item in structure[n - 1]" :key="_item[itemKey]"
           :ref="`item-${_item[itemKey]}`">
        <component :is="itemCom" :item="_item"></component>
      </div>
    </div>
  </div>
</template>
<script>
  // import {getStyle} from "djweb/src/utils/dom";

  export default {
    name: 'alWaterfallBox',
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      itemCom: {
        type: Object,
        default: () => ({}),
      },
      itemKey: {
        type: String,
        default: 'id',
      },
    },
    data: function () {
      return {
        structure: [],
        isMasonry: false,
        columnNumber: 3,
        columnWidth: 0,
      };
    },
    methods: {
      renderFirst() {
        if (this.data[0]) {
          this.structure = [[this.data[0]], [], []];
          this.$nextTick(() => {
            let fatherWidth = this.$el.offsetWidth;
            this.columnWidth = this.$el.querySelector('.al-waterfall-box-item-wrap').offsetWidth;
            let columnNumber = Math.floor(fatherWidth / (this.columnWidth + 10));
            this.columnNumber = columnNumber;
            this.update();
          });
        } else {
          this.structure = [];
        }
      },
      scrollIntoView(obj) {
        let item = this.$refs[`item-${obj[this.itemKey]}`][0];
        if (item) {
          return item.offsetTop;
        }
        // item && item.scrollIntoView();
      },
      initStructure() {
        this.isMasonry = false;
        let structure = new Array(this.columnNumber).fill([]);
        structure[0] = [...this.data];
        this.structure = structure;
      },
      getItemHeight() {
        this.data.forEach(item => {
          if (!item.height) {
            let DomItem = this.$refs[`item-${item[this.itemKey]}`][0];
            let height = parseFloat(getStyle(DomItem, 'height'));
            item.height = height;
          }
        });
      },
      handleMasonry() {
        let structure = new Array(this.columnNumber);
        let heightArr = new Array(this.columnNumber).fill(0);
        this.data.forEach(item => {
          let minHeight = Math.min(...heightArr);
          let minIndex = heightArr.findIndex(val => val === minHeight);
          if (!structure[minIndex]) {
            structure[minIndex] = [];
          }
          structure[minIndex].push(item);
          heightArr[minIndex] += item.height || 1;
        });
        this.structure = structure;
        this.isMasonry = true;
      },
      update() {
        this.initStructure();
        this.$nextTick(() => {
          this.getItemHeight();
          this.handleMasonry();
        });
      },
    },
    mounted() {
      this.renderFirst();
    },
    watch: {
      data() {
        this.renderFirst();
      },
    },
  };
</script>
