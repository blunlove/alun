<template>
  <div class="al-form">
    <el-form ref="ruleForm" :model="formData" v-bind="bindForm()" @submit.native.prevent>
      <al-grid-box :data="formOptions" v-bind="$attrs">
        <template slot-scope="{item}">
          <el-form-item v-bind="item.formItem">
            <template v-if="item.type">
              <component
                v-if="!(item.computed || item.formatter)"
                :is="getComponent(item)"
                :ref="getKey(item)"
                v-model="formData[item.formItem.prop]"
                v-bind="getBind(item)"
                v-on="listenersMap[getKey(item)]">
              </component>
              <component
                v-else
                :is="getComponent(item)"
                :ref="getKey(item)"
                :value="valueExtend(item)"
                v-bind="getBind(item)"
                v-on="listenersMap[getKey(item)]">
              </component>
            </template>
            <span class="al-form_text" v-else>{{ valueExtend(item) }}</span>
          </el-form-item>
        </template>
      </al-grid-box>
    </el-form>
  </div>
</template>

<script>
  import typeMapPolicy from "../../../src/mixins/typeMapPolicy";
  import listenersMap from "../../../src/mixins/listenersMap";
  import alGridBox from '../../container/alGridBox';

  const formAttrs = {
    'label-position': 'right',
    'label-width': '92px',
    'label-suffix': ''
  };
  export default {
    name: "al-form",
    mixins: [typeMapPolicy, listenersMap()],
    props: {
      //表单数据
      formData: {
        type: Object,
        default: () => ({})
      },
      //表单参数
      formOptions: {
        type: Array,
        default: () => [{
          type: '', //必填，当前项的类型：input(输入框)、select(下拉框)、date(日期控件)、custom(自定义组件)
          // hasWordsCount: false, //非必填，是否包含字数统计，仅在type为input的时候生效
          formItem: { //必填，form-item元素的绑定值
            prop: '', //必填，当前项的prop和model名
            label: '', //必填，当前项的label
            rules: [] //必填，当前项的校验规则
          },
          attrs: {}, //非必填，组件的绑定值
          // subAtrrs: {}, //非必填，组件子元素的绑定值
          listeners: {}, //非必填，组件的绑定事件
          // subListeners: {}, //非必填，组件子元素的绑定事件
          component: {}, //非必填，自定义组件
          render: ()=>{}, //非必填，自定义组件
          // keyMap: {}, //非必填，枚举关键字映射表
          // subList: []//非必填，组件子元素的枚举
        }]
      },
      //是否为编辑（编辑下初始化即校验表单）
      isEdit: {
        type: Boolean,
        default: false
      },
      autoComplete: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {};
    },
    mounted() {
      this.$nextTick(() => {
        //如果处于编辑状态，则初始化时自动校验表单，反之不校验
        if (this.isEdit) {
          this.validate();
        }
      });
    },
    methods: {
      //通过方法设定该模块的值
      valueExtend(item) {
        let { computed, formatter } = item;
        if (computed || formatter) {
          let isComputed = Boolean(computed);
          let fn = isComputed ? computed : formatter;
          let val = fn.bind(this)(this.getBind(item));
          isComputed && (this.formData[this.getKey(item)] = val);
          return val;
        } else {
          return this.formData[this.getKey(item)];
        }
      },
      /**
       * 删除el-form绑定属性
       */
      bindForm() {
        return Object.assign({}, formAttrs, this.$attrs);
      },
      /**
       * 绑定组件的配置项
       * @param bind 传入的配置项
       * @param type 组件的类型
       */
      getBind(item) {
        return Object.assign({
          label: item.formItem.label,
          item,
          cur: this.formData[this.getKey(item)],
          autocomplete: this.autoComplete ? undefined : 'new-' + item.formItem.prop
        }, item['attrs']);
      },
      /**
       * 手动表单校验
       * @param fn 回调函数
       */
      validate(successFn, errorFn) {
        return new Promise(((resolve, reject) => {
          this.$refs.ruleForm.validate((valid, obj) => {
            if (valid) {
              typeof successFn === 'function' && successFn(obj);
              resolve(obj);
            } else {
              typeof errorFn === 'function' && errorFn(obj);
              reject(obj);
            }
          });
        }));
      },
      /**
       * 专供单元测试的表单校验
       * @return validateError 由未通过校验的字段名形成的数组
       */
      validateForTest() {
        let validateError = [];
        this.$refs.ruleForm.validate((valid, error) => {
          for (let item of Object.keys(error)) {
            validateError.push(error[item][0].message);
          }
        });
        return validateError;
      },
      /**
       * 手动重置表单
       */
      resetFields() {
        this.$refs.ruleForm !== undefined && this.$refs.ruleForm.resetFields();
      },
      /**
       * 对部分表单字段进行校验
       * @param prop 校验的字段
       * @param callback 回调函数
       */
      validateField(prop, callback) {
        this.$refs.ruleForm.validateField(prop, callback);
      },
      /**
       * 移除表单项的校验结果
       * @param props 待移除的字段数组
       */
      clearValidate(props) {
        this.$refs.ruleForm.clearValidate(props);
      },
      /**
       * 修改表单配置项属性
       * @param prop 配置项的props属性，根据此属性查询当前表单项
       * @param attr 配置项的第一层属性，如bind,subBind
       * @param subAttrOrValue 配置项的第二层属性（如bind下的placeholder）或将要覆盖的值
       * @param value 将要覆盖的值
       */
      modifyFormOption(prop, attr, subAttrOrValue, value) {
        let optionIndex = (() => {
          for (let index in Object.keys(this.formOptions)) {
            if (this.formOptions[index].formItem.prop === prop) {
              return index;
            }
          }
        })();
        if (optionIndex !== undefined) {
          if (arguments.length === 3) {
            this.$set(this.formOptions[optionIndex], attr, subAttrOrValue);
            // this.formOptions[optionIndex][attr] = value;
          } else {
            !this.formOptions[optionIndex][attr] && (this.formOptions[optionIndex][attr] = {});
            this.$set(this.formOptions[optionIndex][attr], subAttrOrValue, value);
            // this.formOptions[optionIndex][attr][subAttr] = value;
          }
        }
      }
    },
    components: {
      alGridBox
    }
  }
  ;
</script>
<style lang="less">
.al-form {
  // margin-bottom: 0;
  // /deep/ .el-form-item__label {
  //   margin: 0;
  // }
  /deep/ .el-form-item {
    // padding-right: 8px;
    // margin-top: 4px;
    // margin-bottom: 20px;
    // line-height: 34px;
    .el-form-item__content {
      position: relative;
      // word-break: break-word;
      // margin-left: 100px;
      // width: calc(~'100% - 100px');
    }
  }
  /* /deep/ .is-error {
      .el-checkbox-group {
        border-color: #f56c6c;
      }
    }
    /deep/ .is-success {
      .el-checkbox-group {
        border-color: #67c23a;
      }
    }*/
  /deep/ .el-input, .el-select {
    width: 100%;
  }
  /*.el-checkbox-group {
    border: 1px solid transparent;
  }*/
  // .el-checkbox {
  //   margin-right: 10px;
  //   margin-left: 0;
  // }
  /deep/ .el-textarea__inner {
    resize: none;
  }
  // .el-radio {
  //   & + .el-radio {
  //     margin-left: 20px;
  //   }
  //   /deep/ .el-radio__label {
  //     padding-left: 2px;
  //   }
  // }
}
</style>