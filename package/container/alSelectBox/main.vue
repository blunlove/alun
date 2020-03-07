<template>
  <div class="al-select-box">
    <div class="al-select-box-value" @click.stop>
      <div class="al-select-box-value-content">
        <slot name="value">
          <div class="al-select-box-value-content-left">
            defualt
          </div>
        </slot>
        <div
          class="al-select-box-value-content-button" @click="showBoard = !showBoard">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <transition name="el-zoom-in-top">
        <div class="al-select-box-value-board" v-show="showBoard">
          <div class="popper-arrow"></div>
          <div class="al-select-box-value-board-box">
            <div class="al-select-box-value-board-box-content">
              <slot name="content">
                <div class="al-select-box-value-board-box-content-defualt">
                  默认框
                </div>
              </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  // import {listenerPolicy} from 'djcpsweb-utils';

  export default {
    name: 'alSelectBox',
    data() {
      return {
        showBoard: false,
      };
    },
    mixins: [listenerPolicy],
    methods: {
      clickOutSide() {
        this.showBoard = false;
      },
    },
    mounted() {
      this.addListener(window, 'click', this.clickOutSide);
    },
  };
</script>
