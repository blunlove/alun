<template>
  <div class="wordsCount">
    <span>{{inputCounts}}</span>
    <span>/</span>
    <span>{{inputLimit}}</span>
  </div>
</template>

<script>
  //计数组件，针对输入框，显示“已输入文字数量/限制的文字数量”
  export default {
    name: "wordsCount",
    props: {
      inputData: {
        default: ''
      }, //输入的数据
      inputLimit: {
        default: '100'
      } //输入的字数限制
    },
    computed: {
      //输出已输入的字数，可在这里对输入的数据进行实时处理
      inputCounts() {
        return this.inputData.length;
      }
    }
  };
</script>
