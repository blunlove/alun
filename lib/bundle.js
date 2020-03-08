'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsCookie = _interopDefault(require('js-cookie'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var DEFAULT_DIALOG_CONFIG = {
  'top': '0',
  'close-on-click-modal': false,
  'append-to-body': false
};
var script = {
  name: 'al-dialog',
  props: {
    title: {
      "default": '标题'
    },
    hasFooter: {
      "default": true
    },
    loading: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      dialogVisible: false,
      isOpen: false
    };
  },
  computed: {
    filterListeners: function filterListeners() {
      return ['close', 'open'].reduce(function (sum, key) {
        delete sum[key];
        return sum;
      }, _objectSpread2({}, this.$listeners));
    },
    dialogBind: function dialogBind() {
      return _objectSpread2({}, DEFAULT_DIALOG_CONFIG, {}, this.$attrs);
    }
  },
  methods: {
    confirm: function confirm() {
      this.$emit('confirm');
    },
    open: function open() {
      this.dialogVisible = true;
      this.isOpen = true;
    },
    closed: function closed() {
      this.isOpen = false;
    },
    closeCallback: function closeCallback() {
      this.dialogVisible && this.$emit('close');
    },
    close: function close() {
      this.dialogVisible = false;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "al-dialog" },
    [
      _c(
        "el-dialog",
        _vm._g(
          _vm._b(
            {
              attrs: { top: "15vh", visible: _vm.dialogVisible },
              on: {
                close: _vm.closeCallback,
                closed: _vm.closed,
                open: _vm.open
              }
            },
            "el-dialog",
            _vm.dialogBind,
            false
          ),
          _vm.filterListeners
        ),
        [
          _c(
            "template",
            { slot: "title" },
            [
              _vm._t("title", [
                _c("span", { staticClass: "el-dialog__title" }, [
                  _vm._v(_vm._s(_vm.title))
                ])
              ])
            ],
            2
          ),
          _vm._v(" "),
          _vm.isOpen
            ? _c(
                "div",
                { staticClass: "al-dialog-content" },
                [_vm._t("default")],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "al-dialog-footer",
              class: _vm.hasFooter ? "" : "has-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _vm.hasFooter
                ? _vm._t("footer", [
                    _c("el-button", { on: { click: _vm.closeCallback } }, [
                      _vm._v("取 消")
                    ]),
                    _vm._v(" "),
                    _vm._t("footer-confirm", [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "primary", loading: _vm.loading },
                          on: { click: _vm.confirm }
                        },
                        [_vm._v("确 认")]
                      )
                    ])
                  ])
                : _vm._e()
            ],
            2
          )
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-661bd56b_0", { source: ".al-dialog /deep/ .el-dialog__wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog {\n  width: auto;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog__body {\n  padding: 0 20px;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog__footer > div {\n  display: flex;\n  justify-content: flex-end;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog__footer > div > div + div {\n  margin-left: 40px;\n}\n", map: {"version":3,"sources":["main.vue"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,uBAAuB;EACvB,uBAAuB;AACzB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;AACjB;AACA;EACE,aAAa;EACb,yBAAyB;AAC3B;AACA;EACE,iBAAiB;AACnB","file":"main.vue","sourcesContent":[".al-dialog /deep/ .el-dialog__wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog {\n  width: auto;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog__body {\n  padding: 0 20px;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog__footer > div {\n  display: flex;\n  justify-content: flex-end;\n}\n.al-dialog /deep/ .el-dialog__wrapper .el-dialog__footer > div > div + div {\n  margin-left: 40px;\n}\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

var TYPE_MAP = {
  input: '输入',
  select: '选择'
};
var placeholder = {
  methods: {
    getPlaceholder: function getPlaceholder(type, label) {
      return "\u8BF7".concat(TYPE_MAP[type]).concat((label || '').replace(/[:：] *$/, ''));
    }
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import {handleComponent} from 'djweb/src/utils/handleComponent';
var script$1 = {
  name: 'serviceInput',
  props: {
    value: {},
    service: {
      type: Function,
      "default": function _default() {}
    },
    width: {
      type: Number,
      "default": null
    },
    valueKey: {
      type: String,
      "default": 'value'
    }
  },
  data: function data() {
    return {
      options: []
    };
  },
  computed: {
    component: function component() {
      return handleComponent({
        component: this.$attrs.component,
        render: this.$attrs.render
      });
    }
  },
  methods: {
    focus: function focus() {
      this.$refs.autocomplete.$refs.input.focus();
    },
    getOptions: function getOptions(val, cb) {
      var _this = this;

      this.api().then(function (res) {
        cb(val ? res.filter(function (item) {
          return item[_this.valueKey].includes(val);
        }) : res);
      });
    },
    api: function api() {
      if (this.options.length > 0) {
        return Promise.resolve(this.options);
      } else {
        return this.service();
      }
    },
    handleSelect: function handleSelect(val) {
      this.$emit('input', val[this.valueKey]);
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "service-input" },
    [
      _c(
        "el-autocomplete",
        _vm._g(
          _vm._b(
            {
              ref: "autocomplete",
              attrs: { value: _vm.value, "fetch-suggestions": _vm.getOptions },
              on: { select: _vm.handleSelect },
              scopedSlots: _vm._u(
                [
                  {
                    key: "default",
                    fn: function(ref) {
                      var item = ref.item;
                      return _vm.component
                        ? [
                            _c(_vm.component, {
                              tag: "component",
                              attrs: { item: item }
                            })
                          ]
                        : undefined
                    }
                  }
                ],
                null,
                true
              )
            },
            "el-autocomplete",
            Object.assign({}, _vm.$attrs, { valueKey: _vm.valueKey }),
            false
          ),
          _vm.$listeners
        )
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var defaultReg = /(( )|([\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[9|E]\u3030|\uA9|\uAE|\u3030))+/;
var script$2 = {
  mixins: [placeholder],
  name: 'al-input',
  props: {
    isAutoFocus: {
      type: Boolean,
      "default": false
    },
    suffixLabel: {
      type: String
    },
    label: {
      type: String,
      "default": '内容'
    },
    value: {
      "default": ''
    },
    type: {
      "default": 'input'
    },
    subscript: {
      "default": true
    },
    width: {
      type: Number,
      "default": null
    },
    height: {
      type: Number,
      "default": null
    },
    reg: {},
    "default": {}
  },
  data: function data() {
    return {
      query: ''
    };
  },
  components: {
    serviceInput: __vue_component__$1
  },
  mounted: function mounted() {
    if (!['', null].includes(this.value)) {
      this.change(this.value + '');
    } else if (this["default"] !== undefined) {
      this.change(this["default"] + '');
    }

    if (this.height !== null && this.type === 'textarea') {
      this.$el.querySelector('.al-input-content textarea').style.height = this.height + 'px';
    }

    if (this.isAutoFocus) {
      this.focus();
    }
  },
  computed: {
    filterListeners: function filterListeners() {
      return ['input'].reduce(function (sum, key) {
        delete sum[key];
        return sum;
      }, _objectSpread2({}, this.$listeners));
    }
  },
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    },
    checkReg: function checkReg(val) {
      if (!this.reg) return true;

      if (this.reg.constructor === RegExp) {
        return this.reg.test(val);
      } else if (this.reg.constructor === Array || this.reg.constructor === Object) {
        for (var key in this.reg) {
          if (!this.reg[key].test(val)) return false;
        }

        return true;
      } else {
        return true;
      }
    },
    change: function change(value) {
      var query = value;

      if (this.type === 'number') {
        query = query.replace(/\D/g, '');
        query = typeof query === 'string' && query !== '' ? Number(query) : query;
      } else if (this.type === 'float') {
        query = query.replace(/[^(0-9)|.]/g, '');
        var temp = query.split('.');
        temp = temp.slice(0, 2);
        temp[0] = temp[0].slice(0, 9);
        temp[1] ? temp[1] = temp[1].slice(0, 2) : '';
        query = temp.join('.'); // query = typeof query === 'string' && query !== '' ? Number(query) : query;
      } else if (['input', 'textarea'].includes(this.type)) {
        query = query.replace(defaultReg, '');
      }

      if (!this.checkReg(query)) {
        query = this.checkReg(this.value) ? this.value : '';
      } // 高版本的element-ui的input组件没有setCurrentValue方法，在此避免报错


      try {
        if (query !== value && this.$refs.input) {
          this.$refs.input.setCurrentValue(query);
        }
      } catch (e) {}

      this.$emit('input', query);
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "al-input" }, [
    _vm.type === "service"
      ? _c(
          "div",
          { staticClass: "al-input-content" },
          [
            _c(
              "service-input",
              _vm._g(
                _vm._b(
                  { ref: "input", attrs: { value: _vm.value } },
                  "service-input",
                  Object.assign(
                    {},
                    { placeholder: _vm.getPlaceholder("input", _vm.label) },
                    _vm.$attrs
                  ),
                  false
                ),
                _vm.$listeners
              )
            )
          ],
          1
        )
      : _c(
          "div",
          {
            staticClass: "al-input-content",
            style: { width: _vm.width + "px" }
          },
          [
            _c(
              "el-input",
              _vm._g(
                _vm._b(
                  {
                    ref: "input",
                    attrs: { value: _vm.value },
                    on: { input: _vm.change }
                  },
                  "el-input",
                  Object.assign(
                    {},
                    {
                      placeholder: _vm.getPlaceholder("input", _vm.label),
                      type: _vm.type !== "number" ? _vm.type : undefined,
                      maxlength: _vm.type === "textarea" ? 200 : null
                    },
                    _vm.$attrs
                  ),
                  false
                ),
                _vm.filterListeners
              ),
              [
                _vm._l(Object.keys(_vm.$slots), function(key) {
                  return _c("template", { slot: key }, [_vm._t(key)], 2)
                })
              ],
              2
            )
          ],
          1
        )
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

/* istanbul ignore next */

__vue_component__$2.install = function (Vue) {
  Vue.component(__vue_component__$2.name, __vue_component__$2);
};

var defaultKeyMap = {
  label: 'label',
  value: 'value'
};
var choice = {
  props: {
    keyMap: {
      type: Object,
      "default": function _default() {
        return {
          label: 'label',
          value: 'value'
        };
      }
    },
    options: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    subAtrrs: {
      "default": function _default() {
        return {};
      }
    }
  },
  computed: {
    keyMap_: function keyMap_() {
      return _objectSpread2({}, defaultKeyMap, {}, this.keyMap);
    }
  }
};

var DEFAULT_SELECT_ATTRS = {
  clearable: true,
  size: 'medium'
};
var script$3 = {
  name: 'alSelect',
  props: {
    value: {},
    label: {
      "default": null
    },
    service: {
      "default": null
    },
    type: {
      "default": 'single'
    },
    autoFormat: {
      type: Boolean,
      "default": true
    },
    // 在用service获取options时搭配使用，options为本地数据时，使用default绑定
    selectFirst: {
      type: Boolean,
      "default": false
    },
    width: {
      type: Number,
      "default": null
    },
    bindObject: {
      type: Boolean,
      "default": false
    },
    "default": {
      "default": undefined
    }
  },
  mixins: [placeholder, choice],
  computed: {
    query: {
      get: function get() {
        if (this.type === 'multiple') {
          return Array.isArray(this.value) && this.value.length ? this.value : this["default"] || [];
        } else {
          return this.value !== undefined ? this.value : this["default"];
        }
      },
      set: function set(val) {
        return val;
      }
    },
    options_: {
      get: function get() {
        return this.options || [];
      },
      set: function set(val) {
        return val;
      }
    },
    filterListeners: function filterListeners() {
      return ['input'].reduce(function (sum, key) {
        delete sum[key];
        return sum;
      }, _objectSpread2({}, this.$listeners));
    }
  },
  methods: {
    //多选时，加上特殊类名，防止内容过长时超出输入框
    getSelectWrapClass: function getSelectWrapClass() {
      if (this.type === 'multiple') {
        if (this.$attrs['collapse-tags']) {
          return 'select-ellipsis-multi-col';
        } else {
          return 'select-ellipsis-multi';
        }
      }
    },
    getLabel: function getLabel(item) {
      if (item[this.keyMap_.label] !== undefined) {
        return item[this.keyMap_.label];
      } else if (item[this.keyMap_.value] !== undefined) {
        return item[this.keyMap_.value];
      } else {
        return item;
      }
    },
    getValue: function getValue(item) {
      if (this.bindObject) {
        return item;
      } else if (item[this.keyMap_.value] !== undefined) {
        return item[this.keyMap_.value];
      } else if (item[this.keyMap_.label] !== undefined) {
        return item[this.keyMap_.label];
      } else {
        return item;
      }
    },
    valueChange: function valueChange(val) {
      this.$emit('input', val);
    },
    getOptions: function getOptions(val) {
      var _this = this;

      if (!this.service) return;
      this.options_ = [];
      return this.service(val).then(function (res) {
        _this.options_ = res;

        _this.$nextTick(_this.getFirstValue);
      });
    },
    getBind: function getBind() {
      return _objectSpread2({}, DEFAULT_SELECT_ATTRS, {
        placeholder: this.getPlaceholder('select', this.label),
        valueKey: this.bindObject ? this.keyMap_.value : undefined
      }, this.$attrs);
    },
    getFirstValue: function getFirstValue() {
      if (this.selectFirst) {
        if (this.bindObject) {
          this.query = this.options_[0];
        } else {
          this.query = this.options_[0] ? this.options_[0][this.keyMap_.value] : undefined;
        }

        this.$emit('change-default', this.query);
        this.valueChange(this.query);
      }
    }
  },
  mounted: function mounted() {
    if (this.value !== this.query) {
      this.$emit('input', this.query);
    }

    if (this.autoFormat) {
      this.getOptions();
    } else {
      this.getFirstValue();
    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "el-select",
    _vm._g(
      _vm._b(
        {
          class: _vm.getSelectWrapClass(),
          style: { width: _vm.width + "px" },
          attrs: {
            value: _vm.query,
            size: "small",
            multiple: _vm.type === "multiple"
          },
          on: { input: _vm.valueChange }
        },
        "el-select",
        _vm.getBind(),
        false
      ),
      _vm.filterListeners
    ),
    _vm._l(_vm.options_, function(item, index) {
      return _c(
        "el-option",
        _vm._b(
          {
            key: _vm.getLabel(item) + _vm.getValue(item) + index,
            attrs: {
              label: _vm.getLabel(item),
              value: _vm.getValue(item),
              disabled: item.disabled
            }
          },
          "el-option",
          _vm.subAtrrs,
          false
        )
      )
    }),
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

/* istanbul ignore next */

__vue_component__$3.install = function (Vue) {
  Vue.component(__vue_component__$3.name, __vue_component__$3);
};

var controls = {
  alInput: __vue_component__$2,
  alSelect: __vue_component__$3
};

function handleComponent$1(obj) {
  var component = obj.component,
      render = obj.render;

  if (render) {
    return {
      functional: true,
      render: render
    };
  } else {
    return component;
  }
}
var typeMapPolicy = {
  props: {
    typeMap: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  computed: {
    _typeMap: function _typeMap() {
      return Object.assign({}, this.typeMap);
    }
  },
  methods: {
    getComponent: function getComponent() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = obj.type;
      return type === 'custom' && handleComponent$1(obj) || type;
    }
  },
  components: _objectSpread2({}, controls)
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bundle = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var Cookies = _interopDefault(jsCookie);
/**
 * 判断变量的类型
 * @param val
 * @param type
 * @returns {Boolean}
 */


function checkType(val, type) {
  if (Array.isArray(type)) {
    return type.some(t => Object.prototype.toString.call(val) === `[object ${t}]`);
  } else {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  }
}
/**
 * 变量转boolean
 * @param value
 * @returns {boolean}
 */


function coerceBoolean(value) {
  return value !== null && value !== undefined && `${value}` !== 'false' && `${value}` !== 'NaN' && `${value}` !== '';
}
/**
 * 判断变量的类型
 * @param val
 * @returns {string}
 */


function getObjectType(val) {
  return Object.prototype.toString.call(val);
}
/**
 * 表单校验-设置各种校验规则模板
 */

/**
 * 必填项校验
 * @param msg 错误提示信息
 * @constructor
 */


function Re_required(msg) {
  this.msg = msg;

  this.validator = (rule, value, callback) => {
    let isEmptyArray = Array.isArray(value) && value.length === 0;
    let isEmptyObject = getObjectType(value) === '[object Object]' && JSON.stringify(value) === '{}';
    let isEmptyString = value === undefined || value === null || typeof value === 'string' && value.replace(/[\r\n\s]+/, '') === '';

    if (isEmptyArray || isEmptyObject || isEmptyString) {
      callback(new Error(this.msg || '请填写必填项'));
    } else {
      callback();
    }
  };
} //固定电话校验


const phone = (rule, value, callback) => {
  let regexp = /^(\d{3}-\d{8,11}|\d{4}-\d{7,10})$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('固定电话格式不正确！'));
  } else {
    callback();
  }
}; //手机号校验


const telephone = (rule, value, callback) => {
  let regexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('手机号格式不正确！'));
  } else {
    callback();
  }
}; //短号校验


const shortPhone = (rule, value, callback) => {
  let regexp = /^\d{6}$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('联系短号需填写6位数字！'));
  } else {
    callback();
  }
}; //身份证号校验


const idCard = (rule, value, callback) => {
  // let regexp = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
  let regexp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('身份证号格式不正确！'));
  } else {
    callback();
  }
}; //邮箱校验


const email = (rule, value, callback) => {
  let regexp = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('邮箱格式不正确！'));
  } else {
    callback();
  }
}; //正整数校验


const posInt = (rule, value, callback) => {
  let regexp = /^[1-9]\d*$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('请填写正整数！'));
  } else {
    callback();
  }
}; //库位容积校验


const volume = (rule, value, callback) => {
  let regexp = /^\d{0,6}(\.|(\.\d{0,2}))?$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('库位容积格式不正确！'));
  } else {
    callback();
  }
}; //库位承重校验


const weight = (rule, value, callback) => {
  let regexp = /^\d{0,5}(\.|(\.\d{0,2}))?$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('库位承重格式不正确！'));
  } else {
    callback();
  }
}; //库位长宽高校验


const length = (rule, value, callback) => {
  let regexp = /^\d{0,2}(\.|(\.\d))?$/;
  let exist = coerceBoolean(value);

  if (exist && !regexp.test(value)) {
    callback(new Error('库位数值格式不正确！'));
  } else {
    callback();
  }
};
/**
 * 数字大小校验
 * @param symbol 比较的符号（如>、<、>=、<=等）
 * @param baseNum 比较的基准数字
 * @param msg 错误提示信息
 * @constructor
 */


function IntCompared(symbol, baseNum, msg) {
  this.symbol = symbol;
  this.baseNum = parseInt(baseNum, 10);
  this.msg = msg;

  this.validator = (rule, value, callback) => {
    let compare = false;

    switch (this.symbol) {
      case '>':
        compare = parseInt(value, 10) > this.baseNum;
        break;

      case '>=':
        compare = parseInt(value, 10) >= this.baseNum;
        break;

      case '<':
        compare = parseInt(value, 10) < this.baseNum;
        break;

      case '<=':
        compare = parseInt(value, 10) <= this.baseNum;
        break;

      default:
        compare = parseInt(value, 10) === this.baseNum;
    }

    if (!isNaN(value) && !compare) {
      callback(new Error(this.msg || '请填写符合要求的数字！'));
    } else {
      callback();
    }
  };
} //非法字符校验


const illegal = (rule, value, callback) => {
  let regexp = /[\s]/;
  let exist = coerceBoolean(value);

  if (exist && regexp.test(value)) {
    callback(new Error('禁止输入空格！'));
  } else {
    callback();
  }
};

const formRules = {
  required(msg) {
    let requiredValid = new Re_required(msg);
    return {
      required: true,
      validator: requiredValid.validator,
      trigger: 'change'
    };
  },

  phone: {
    validator: phone,
    trigger: 'change'
  },
  telephone: {
    validator: telephone,
    trigger: 'change'
  },
  shortPhone: {
    validator: shortPhone,
    trigger: 'change'
  },
  idCard: {
    validator: idCard,
    trigger: 'change'
  },
  email: {
    validator: email,
    trigger: 'change'
  },
  posInt: {
    validator: posInt,
    trigger: 'change'
  },
  volume: {
    validator: volume,
    trigger: 'change'
  },
  weight: {
    validator: weight,
    trigger: 'change'
  },
  length: {
    validator: length,
    trigger: 'change'
  },

  intCompared(symbol, baseNum, msg) {
    let intComparedValid = new IntCompared(symbol, baseNum, msg);
    return {
      validator: intComparedValid.validator,
      trigger: 'change'
    };
  },

  illegal: {
    validator: illegal,
    trigger: 'change'
  }
};
/**
 * Created by sl-c on 2018/03/25.
 * sessionStorage相关方法
 */

/**
 * 获取sessionitem，并解析
 * @param item
 * @returns {any}
 */

function getSessionItem(item) {
  let value = sessionStorage.getItem(item);

  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}
/**
 * 设置sessionitem，若值为空，则删除当前item
 * @param item
 * @param value
 */


function setSessionItem(item, value) {
  if (coerceBoolean(value)) {
    sessionStorage.setItem(item, JSON.stringify(value));
  } else {
    deleteSessionItem(item);
  }
}
/**
 * 删除sessionitem
 * @param item
 */


function deleteSessionItem(item) {
  sessionStorage.removeItem(item);
}
/**
 * 获取Cookiesitem，并解析
 * @param item
 * @returns {any}
 */


function getCookiesItem(item) {
  let _value = Cookies.get(item);

  if (coerceBoolean(_value)) {
    try {
      return JSON.parse(_value);
    } catch (err) {
      return _value;
    }
  } else {
    return undefined;
  }
}
/**
 * 设置Cookiesitem，若值为空，则删除当前item
 * @param item
 * @param value
 */


function setCookiesItem(item, value, options) {
  if (coerceBoolean(value)) {
    let _value = Object.prototype.toString.call(value) === '[object String]' ? value : JSON.stringify(value);

    Cookies.set(item, _value, options);
  } else {
    deleteCookiesItem(item);
  }
}
/**
 * 删除Cookiesitem
 * @param item
 */


function deleteCookiesItem(item) {
  Cookies.remove(item);
}
/**
 * 清空sessionStorage
 */


function clearSession() {
  sessionStorage.clear();
} // /**
//  * TODO 清空Cookies
//  */
// export function clearCookies() {
// }

/**
 * 获取localstorage，并解析
 * @param item
 * @returns {any}
 */


function getLocalStorageItem(key) {
  if (!window.localStorage) {
    console.log("浏览器不支持localstorage");
    return false;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}
/**
 * 设置localstorage，并解析
 * @param item
 * @returns {any}
 */


function setLocalStorageItem(key, obj) {
  if (!window.localStorage) {
    console.log("浏览器不支持localstorage");
    return false;
  } else {
    if (coerceBoolean(obj)) {
      localStorage.setItem(key, JSON.stringify(obj));
    } else {
      deleteLocalStorageItem(key);
    }
  }
}
/**
 * 移除localstorage，并解析
 * @param item
 * @returns {any}
 */


function deleteLocalStorageItem(key) {
  if (!window.localStorage) {
    console.log("浏览器不支持localstorage");
    return false;
  } else {
    localStorage.removeItem(key);
  }
}
/**
 * 清空localstorage，并解析
 * @param item
 * @returns {any}
 */


function clearLocalStorage() {
  if (!window.localStorage) {
    console.log("浏览器不支持localstorage");
    return false;
  } else {
    localStorage.clear();
  }
}

exports.checkType = checkType;
exports.clearLocalStorage = clearLocalStorage;
exports.clearSession = clearSession;
exports.coerceBoolean = coerceBoolean;
exports.deleteCookiesItem = deleteCookiesItem;
exports.deleteLocalStorageItem = deleteLocalStorageItem;
exports.deleteSessionItem = deleteSessionItem;
exports.formRules = formRules;
exports.getCookiesItem = getCookiesItem;
exports.getLocalStorageItem = getLocalStorageItem;
exports.getObjectType = getObjectType;
exports.getSessionItem = getSessionItem;
exports.setCookiesItem = setCookiesItem;
exports.setLocalStorageItem = setLocalStorageItem;
exports.setSessionItem = setSessionItem;
});

unwrapExports(bundle);
var bundle_1 = bundle.checkType;
var bundle_2 = bundle.clearLocalStorage;
var bundle_3 = bundle.clearSession;
var bundle_4 = bundle.coerceBoolean;
var bundle_5 = bundle.deleteCookiesItem;
var bundle_6 = bundle.deleteLocalStorageItem;
var bundle_7 = bundle.deleteSessionItem;
var bundle_8 = bundle.formRules;
var bundle_9 = bundle.getCookiesItem;
var bundle_10 = bundle.getLocalStorageItem;
var bundle_11 = bundle.getObjectType;
var bundle_12 = bundle.getSessionItem;
var bundle_13 = bundle.setCookiesItem;
var bundle_14 = bundle.setLocalStorageItem;
var bundle_15 = bundle.setSessionItem;

var DEFAULT_OPTION = {
  configs: 'formOptions',
  data: 'formData',
  key: 'formItem.prop'
};

function getComponent(com) {
  return Array.isArray(com) ? com[0] : com;
}

function insertThis(arr, obj) {
  var _this = this;

  var cKey = obj.cKey,
      tKey = obj.tKey;
  var _arr = arr;

  if (!Array.isArray(arr)) {
    _arr = [arr];
  }

  return _arr.map(function (fn) {
    return function () {
      var com = getComponent(_this.$refs[cKey]);
      var targetCom = getComponent(_this.$refs[tKey]);

      for (var _len = arguments.length, argv = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        argv[_key2] = arguments[_key2];
      }

      fn.bind(com).apply(void 0, argv.concat([_objectSpread2({
        cCom: com,
        tCom: targetCom
      }, obj)]));
    };
  });
}

function insertFn(map, prop, eventName, callback) {
  if (!map[prop]) {
    map[prop] = {};
  }

  if (!map[prop][eventName]) {
    map[prop][eventName] = [];
  }

  if (bundle_1(callback, 'Array')) {
    var _map$prop$eventName;

    (_map$prop$eventName = map[prop][eventName]).push.apply(_map$prop$eventName, _toConsumableArray(callback));
  } else if (bundle_1(callback, 'Function')) {
    map[prop][eventName].push(callback);
  }
}

var listenersMap = (function (options) {
  var _DEFAULT_OPTION$optio = _objectSpread2({}, DEFAULT_OPTION, {}, options),
      configs = _DEFAULT_OPTION$optio.configs,
      key = _DEFAULT_OPTION$optio.key,
      data = _DEFAULT_OPTION$optio.data;

  return {
    computed: {
      listenersMap: function listenersMap() {
        var _this2 = this;

        var map = {};
        this[configs].forEach(function (op, index) {
          var linkListeners = op.linkListeners;
          var listeners = op.listeners;

          var key = _this2.getKey(op, index);

          var argvObj = {
            cKey: key,
            cOption: op,
            configs: _this2[configs],
            data: _this2[data]
          };

          if (linkListeners) {
            Object.keys(linkListeners).forEach(function (prop) {
              Object.keys(linkListeners[prop]).forEach(function (eventName) {
                var lis = linkListeners[prop][eventName];
                insertFn(map, prop, eventName, insertThis.bind(_this2)(lis, _objectSpread2({
                  tKey: prop,
                  tOption: _this2[configs].filter(function (obj) {
                    return _this2.getKey(obj) === prop;
                  })[0]
                }, argvObj)));
              });
            });
          }

          if (listeners) {
            Object.keys(listeners).forEach(function (eventName) {
              insertFn(map, key, eventName, insertThis.bind(_this2)(listeners[eventName], _objectSpread2({
                tKey: key,
                tOption: op
              }, argvObj)));
            });
          }
        });
        return map;
      }
    },
    methods: {
      getKey: function getKey(obj, index) {
        var _key = key.split('.').reduce(function (_obj, _key) {
          return _obj[_key];
        }, obj);

        return _key !== undefined ? _key : index;
      }
    }
  };
});

//   return index;
// };

var DEFAULT_COL_RULE = function DEFAULT_COL_RULE(item, index, defaultReturn) {
  return defaultReturn;
};

function widthDistribution(row) {
  var arr = [];

  if (Array.isArray(row)) {
    var avg = Math.floor(24 / row.length);
    var rest = 24 - avg * row.length;
    row.forEach(function () {
      if (rest) {
        arr.push(avg + 1);
        rest--;
      } else {
        arr.push(avg);
      }
    });
  }

  return arr;
}

function sortRow(num, index) {
  return Math.ceil((index + 1) / num) - 1;
}

var script$4 = {
  name: 'alGridBox',
  props: {
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    columnNum: {
      type: Number,
      "default": 1
    },
    rowRule: {
      type: Function // default: DEFAULT_ROW_RULE

    },
    colRule: {
      type: Function,
      "default": DEFAULT_COL_RULE
    }
  },
  render: function render() {
    var _this = this;

    return h("div", {
      "class": "al-grid-box"
    }, [this._l(this.rows, function (row) {
      var arr_width = widthDistribution(row);
      return h("el-row", [_this._l(row, function (item, index) {
        return item ? h("el-col", {
          "attrs": {
            "span": _this.colRule(item, index, arr_width[index] || 24, arr_width)
          }
        }, [_this.$scopedSlots["default"]({
          item: item
        })]) : undefined;
      })]);
    })]);
  },
  computed: {
    rows: function rows() {
      var _this2 = this;

      var _rows = this.data.reduce(function (arr, item, index) {
        var _index = _this2.rowRule ? _this2.rowRule(item, index) : sortRow(_this2.columnNum, index);

        if (!bundle_1(arr[_index], 'Array')) {
          arr[_index] = [];
        }

        arr[_index].push(item);

        return arr;
      }, []); // 解决使用快速分列时，最后一列数量不满时，会出现宽度与其他模块不同的问题


      if (!this.rowRule) {
        _rows.map(function (row) {
          if (row && row.length) {
            var remainder = row.length % _this2.columnNum;

            if (remainder > 0) {
              for (var i = 0; i < _this2.columnNum - remainder; i++) {
                row.push(undefined);
              }
            }
          }
        });
      }

      return _rows;
    }
  },
  data: function data() {
    return {};
  },
  created: function created() {},
  methods: {}
};

/* script */
const __vue_script__$4 = script$4;

/* template */

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = normalizeComponent(
    {},
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

/* istanbul ignore next */

__vue_component__$4.install = function (Vue) {
  Vue.component(__vue_component__$4.name, __vue_component__$4);
};

//
var formAttrs = {
  'label-position': 'right',
  'label-width': '92px',
  'label-suffix': ''
};
var script$5 = {
  name: "al-form",
  mixins: [typeMapPolicy, listenersMap()],
  props: {
    //表单数据
    formData: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    //表单参数
    formOptions: {
      type: Array,
      "default": function _default() {
        return [{
          type: '',
          //必填，当前项的类型：input(输入框)、select(下拉框)、date(日期控件)、custom(自定义组件)
          // hasWordsCount: false, //非必填，是否包含字数统计，仅在type为input的时候生效
          formItem: {
            //必填，form-item元素的绑定值
            prop: '',
            //必填，当前项的prop和model名
            label: '',
            //必填，当前项的label
            rules: [] //必填，当前项的校验规则

          },
          attrs: {},
          //非必填，组件的绑定值
          // subAtrrs: {}, //非必填，组件子元素的绑定值
          listeners: {},
          //非必填，组件的绑定事件
          // subListeners: {}, //非必填，组件子元素的绑定事件
          component: {},
          //非必填，自定义组件
          render: function render() {} //非必填，自定义组件
          // keyMap: {}, //非必填，枚举关键字映射表
          // subList: []//非必填，组件子元素的枚举

        }];
      }
    },
    //是否为编辑（编辑下初始化即校验表单）
    isEdit: {
      type: Boolean,
      "default": false
    },
    autoComplete: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      //如果处于编辑状态，则初始化时自动校验表单，反之不校验
      if (_this.isEdit) {
        _this.validate();
      }
    });
  },
  methods: {
    //通过方法设定该模块的值
    valueExtend: function valueExtend(item) {
      var computed = item.computed,
          formatter = item.formatter;

      if (computed || formatter) {
        var isComputed = Boolean(computed);
        var fn = isComputed ? computed : formatter;
        var val = fn.bind(this)(this.getBind(item));
        isComputed && (this.formData[this.getKey(item)] = val);
        return val;
      } else {
        return this.formData[this.getKey(item)];
      }
    },

    /**
     * 删除el-form绑定属性
     */
    bindForm: function bindForm() {
      return Object.assign({}, formAttrs, this.$attrs);
    },

    /**
     * 绑定组件的配置项
     * @param bind 传入的配置项
     * @param type 组件的类型
     */
    getBind: function getBind(item) {
      return Object.assign({
        label: item.formItem.label,
        item: item,
        cur: this.formData[this.getKey(item)],
        autocomplete: this.autoComplete ? undefined : 'new-' + item.formItem.prop
      }, item['attrs']);
    },

    /**
     * 手动表单校验
     * @param fn 回调函数
     */
    validate: function validate(successFn, errorFn) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.$refs.ruleForm.validate(function (valid, obj) {
          if (valid) {
            typeof successFn === 'function' && successFn(obj);
            resolve(obj);
          } else {
            typeof errorFn === 'function' && errorFn(obj);
            reject(obj);
          }
        });
      });
    },

    /**
     * 专供单元测试的表单校验
     * @return validateError 由未通过校验的字段名形成的数组
     */
    validateForTest: function validateForTest() {
      var validateError = [];
      this.$refs.ruleForm.validate(function (valid, error) {
        for (var _i = 0, _Object$keys = Object.keys(error); _i < _Object$keys.length; _i++) {
          var item = _Object$keys[_i];
          validateError.push(error[item][0].message);
        }
      });
      return validateError;
    },

    /**
     * 手动重置表单
     */
    resetFields: function resetFields() {
      this.$refs.ruleForm !== undefined && this.$refs.ruleForm.resetFields();
    },

    /**
     * 对部分表单字段进行校验
     * @param prop 校验的字段
     * @param callback 回调函数
     */
    validateField: function validateField(prop, callback) {
      this.$refs.ruleForm.validateField(prop, callback);
    },

    /**
     * 移除表单项的校验结果
     * @param props 待移除的字段数组
     */
    clearValidate: function clearValidate(props) {
      this.$refs.ruleForm.clearValidate(props);
    },

    /**
     * 修改表单配置项属性
     * @param prop 配置项的props属性，根据此属性查询当前表单项
     * @param attr 配置项的第一层属性，如bind,subBind
     * @param subAttrOrValue 配置项的第二层属性（如bind下的placeholder）或将要覆盖的值
     * @param value 将要覆盖的值
     */
    modifyFormOption: function modifyFormOption(prop, attr, subAttrOrValue, value) {
      var _this3 = this;

      var optionIndex = function () {
        for (var index in Object.keys(_this3.formOptions)) {
          if (_this3.formOptions[index].formItem.prop === prop) {
            return index;
          }
        }
      }();

      if (optionIndex !== undefined) {
        if (arguments.length === 3) {
          this.$set(this.formOptions[optionIndex], attr, subAttrOrValue); // this.formOptions[optionIndex][attr] = value;
        } else {
          !this.formOptions[optionIndex][attr] && (this.formOptions[optionIndex][attr] = {});
          this.$set(this.formOptions[optionIndex][attr], subAttrOrValue, value); // this.formOptions[optionIndex][attr][subAttr] = value;
        }
      }
    }
  },
  components: {
    alGridBox: __vue_component__$4
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "al-form" },
    [
      _c(
        "el-form",
        _vm._b(
          {
            ref: "ruleForm",
            attrs: { model: _vm.formData },
            nativeOn: {
              submit: function($event) {
                $event.preventDefault();
              }
            }
          },
          "el-form",
          _vm.bindForm(),
          false
        ),
        [
          _c(
            "al-grid-box",
            _vm._b(
              {
                attrs: { data: _vm.formOptions },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var item = ref.item;
                      return [
                        _c(
                          "el-form-item",
                          _vm._b({}, "el-form-item", item.formItem, false),
                          [
                            item.type
                              ? [
                                  !(item.computed || item.formatter)
                                    ? _c(
                                        _vm.getComponent(item),
                                        _vm._g(
                                          _vm._b(
                                            {
                                              ref: _vm.getKey(item),
                                              tag: "component",
                                              model: {
                                                value:
                                                  _vm.formData[
                                                    item.formItem.prop
                                                  ],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.formData,
                                                    item.formItem.prop,
                                                    $$v
                                                  );
                                                },
                                                expression:
                                                  "formData[item.formItem.prop]"
                                              }
                                            },
                                            "component",
                                            _vm.getBind(item),
                                            false
                                          ),
                                          _vm.listenersMap[_vm.getKey(item)]
                                        )
                                      )
                                    : _c(
                                        _vm.getComponent(item),
                                        _vm._g(
                                          _vm._b(
                                            {
                                              ref: _vm.getKey(item),
                                              tag: "component",
                                              attrs: {
                                                value: _vm.valueExtend(item)
                                              }
                                            },
                                            "component",
                                            _vm.getBind(item),
                                            false
                                          ),
                                          _vm.listenersMap[_vm.getKey(item)]
                                        )
                                      )
                                ]
                              : _c("span", { staticClass: "al-form_text" }, [
                                  _vm._v(_vm._s(_vm.valueExtend(item)))
                                ])
                          ],
                          2
                        )
                      ]
                    }
                  }
                ])
              },
              "al-grid-box",
              _vm.$attrs,
              false
            )
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-8571ca0c_0", { source: ".al-form {\n  /* /deep/ .is-error {\n      .el-checkbox-group {\n        border-color: #f56c6c;\n      }\n    }\n    /deep/ .is-success {\n      .el-checkbox-group {\n        border-color: #67c23a;\n      }\n    }*/\n  /*.el-checkbox-group {\n    border: 1px solid transparent;\n  }*/\n}\n.al-form /deep/ .el-form-item .el-form-item__content {\n  position: relative;\n}\n.al-form /deep/ .el-input,\n.al-form .el-select {\n  width: 100%;\n}\n.al-form /deep/ .el-textarea__inner {\n  resize: none;\n}\n", map: {"version":3,"sources":["main.vue"],"names":[],"mappings":"AAAA;EACE;;;;;;;;;MASI;EACJ;;IAEE;AACJ;AACA;EACE,kBAAkB;AACpB;AACA;;EAEE,WAAW;AACb;AACA;EACE,YAAY;AACd","file":"main.vue","sourcesContent":[".al-form {\n  /* /deep/ .is-error {\n      .el-checkbox-group {\n        border-color: #f56c6c;\n      }\n    }\n    /deep/ .is-success {\n      .el-checkbox-group {\n        border-color: #67c23a;\n      }\n    }*/\n  /*.el-checkbox-group {\n    border: 1px solid transparent;\n  }*/\n}\n.al-form /deep/ .el-form-item .el-form-item__content {\n  position: relative;\n}\n.al-form /deep/ .el-input,\n.al-form .el-select {\n  width: 100%;\n}\n.al-form /deep/ .el-textarea__inner {\n  resize: none;\n}\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

var _require = require('element-ui'),
    Form = _require.Form,
    FormItem = _require.FormItem;

__vue_component__$5.install = function (Vue) {
  Vue.component(__vue_component__$5.name, __vue_component__$5); // Vue.component(wordsCount.name, wordsCount);

  Vue.use(Form);
  Vue.use(FormItem);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$6 = {
  name: 'al-content-box',
  props: {
    title: {
      "default": ''
    },
    background: {
      "default": ''
    }
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "al-content-box fullbox",
      style: { background: _vm.background }
    },
    [
      _c("div", { staticClass: "background" }),
      _vm._v(" "),
      _c("div", { staticClass: "al-content-box-content" }, [
        _c("div", { staticClass: "al-content-box-content-header" }, [
          _c("div", { staticClass: "line" }),
          _vm._v("\n      " + _vm._s(_vm.title) + "\n    ")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "al-content-box-content-bottom" },
          [_vm._t("default")],
          2
        )
      ])
    ]
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-4e2e3656_0", { source: ".al-content-box {\n  position: relative;\n  height: 100%;\n  padding: 40px;\n  box-sizing: border-box;\n}\n.al-content-box-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: white;\n  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.4);\n}\n.al-content-box-content-header {\n  position: relative;\n  height: 50px;\n  padding: 10px;\n  font-size: 40px;\n  line-height: 50px;\n}\n.al-content-box-content-header .line {\n  display: inline-block;\n  width: 15px;\n  height: 100%;\n  vertical-align: top;\n  background: #191dff;\n}\n.al-content-box-content-bottom {\n  position: relative;\n  flex-grow: 1;\n  margin: 20px;\n}\n.background {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 110%;\n  height: 100%;\n  background: inherit;\n}\n", map: {"version":3,"sources":["main.vue","D:\\JS-learning\\alun\\package\\container\\alContentBox\\main.vue"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,iBAAiB;EACjB,4CAA4C;AAC9C;AACA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,mBAAmB;AACrB;AACA;ECCA,kBAAA;EACA,YAAA;EACA,YAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;AACA","file":"main.vue","sourcesContent":[".al-content-box {\n  position: relative;\n  height: 100%;\n  padding: 40px;\n  box-sizing: border-box;\n}\n.al-content-box-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: white;\n  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.4);\n}\n.al-content-box-content-header {\n  position: relative;\n  height: 50px;\n  padding: 10px;\n  font-size: 40px;\n  line-height: 50px;\n}\n.al-content-box-content-header .line {\n  display: inline-block;\n  width: 15px;\n  height: 100%;\n  vertical-align: top;\n  background: #191dff;\n}\n.al-content-box-content-bottom {\n  position: relative;\n  flex-grow: 1;\n  margin: 20px;\n}\n.background {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 110%;\n  height: 100%;\n  background: inherit;\n}\n","<template>\r\n  <div class=\"al-content-box fullbox\" :style=\"{background}\">\r\n    <div class=\"background\"></div>\r\n    <div class=\"al-content-box-content\">\r\n      <div class=\"al-content-box-content-header\">\r\n        <div class=\"line\"></div>\r\n        {{title}}\r\n      </div>\r\n      <div class=\"al-content-box-content-bottom\">\r\n        <slot></slot>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'al-content-box',\r\n  props: {\r\n    title: {\r\n      default: '',\r\n    },\r\n    background: {\r\n      default: '',\r\n    },\r\n  },\r\n};\r\n</script>\r\n<style lang=\"less\">\r\n.al-content-box {\r\n  position: relative;\r\n  height: 100%;\r\n  padding: 40px;\r\n  box-sizing: border-box;\r\n  &-content {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    background: white;\r\n    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.4);\r\n    &-header {\r\n      position: relative;\r\n      height: 50px;\r\n      padding: 10px;\r\n      font-size: 40px;\r\n      line-height: 50px;\r\n      .line {\r\n        display: inline-block;\r\n        width: 15px;\r\n        height: 100%;\r\n        vertical-align: top;\r\n        background: rgb(25, 29, 255);\r\n      }\r\n    }\r\n    &-bottom {\r\n      position: relative;\r\n      flex-grow: 1;\r\n      margin: 20px;\r\n    }\r\n  }\r\n}\r\n.background {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: -1;\r\n  width: 110%;\r\n  height: 100%;\r\n  background: inherit;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

/* istanbul ignore next */

__vue_component__$6.install = function (Vue) {
  Vue.component(__vue_component__$6.name, __vue_component__$6);
};

// import djCollapseTransition from './djCollapseTransition';
// import djItemBox from './djItemBox';
// import djScrollBox from './djScrollBox';
// import djSelectBox from './djSelectBox';
// import djWaterfallBox from './djWaterfallBox';

var container = {
  // djCollapseTransition,
  alContentBox: __vue_component__$6 // djGridBox,
  // djItemBox,
  // djScrollBox,
  // djSelectBox,
  // djWaterfallBox

};

var components = _objectSpread2({
  alDialog: __vue_component__,
  alForm: __vue_component__$5
}, controls, {}, container);

var install = function install(Vue) {
  Object.keys(components).forEach(function (key) {
    Vue.use(components[key]);
  });
};

var index = _objectSpread2({
  install: install
}, components);

module.exports = index;
