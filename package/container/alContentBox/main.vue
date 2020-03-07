<template>
  <div class="al-content-box fullbox" :style="{background}">
    <div class="background"></div>
    <div class="al-content-box-content">
      <div class="al-content-box-content-header">
        <div class="line"></div>
        {{title}}
      </div>
      <div class="al-content-box-content-bottom">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'al-content-box',
  props: {
    title: {
      default: '',
    },
    background: {
      default: '',
    },
  },
};
</script>
<style lang="less">
.al-content-box {
  position: relative;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  &-content {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.4);
    &-header {
      position: relative;
      height: 50px;
      padding: 10px;
      font-size: 40px;
      line-height: 50px;
      .line {
        display: inline-block;
        width: 15px;
        height: 100%;
        vertical-align: top;
        background: rgb(25, 29, 255);
      }
    }
    &-bottom {
      position: relative;
      flex-grow: 1;
      margin: 20px;
    }
  }
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 110%;
  height: 100%;
  background: inherit;
}
</style>
