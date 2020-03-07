<template>
  <div class="al-dialog">
    <el-dialog
      top="15vh"
      :visible="dialogVisible"
      @close="closeCallback"
      @closed="closed"
      @open="open"
      v-bind="dialogBind"
      v-on="filterListeners">
      <template slot="title">
        <slot name="title">
          <span class="el-dialog__title">{{title}}</span>
        </slot>
      </template>
      <div class="al-dialog-content" v-if="isOpen">
        <slot></slot>
      </div>
      <div class="al-dialog-footer" :class="hasFooter ? '' : 'has-footer'" slot="footer">
        <slot name="footer" v-if="hasFooter">
          <el-button @click="closeCallback">取 消</el-button>
          <slot name="footer-confirm">
            <el-button type="primary" @click="confirm" :loading="loading">确 认</el-button>
          </slot>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const DEFAULT_DIALOG_CONFIG = {
  'top': '0',
  'close-on-click-modal': false,
  'append-to-body': false
};

export default {
  name: 'al-dialog',
  props: {
    title: {
      default: '标题',
    },
    hasFooter: {
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      isOpen: false,
    };
  },
  computed: {
    filterListeners() {
      return ['close', 'open'].reduce((sum, key) => {
        delete sum[key];
        return sum;
      }, {...this.$listeners});
    },
    dialogBind() {
      return {
        ...DEFAULT_DIALOG_CONFIG,
        ...this.$attrs
      };
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    open() {
      this.dialogVisible = true;
      this.isOpen = true;
    },
    closed() {
      this.isOpen = false;
    },
    closeCallback() {
      this.dialogVisible && this.$emit('close');
    },
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="less">
.al-dialog {
  /deep/ .el-dialog__wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .el-dialog {
      width: auto;
      &__body {
        padding: 0 20px;
      }
      &__footer {
        & > div {
          display: flex;
          justify-content: flex-end;
          & > div + div {
            margin-left: 40px;
          }
        }
      }
    }
  }
}
</style>