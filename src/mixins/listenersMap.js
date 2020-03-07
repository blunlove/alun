import { checkType } from '../../utils';

const DEFAULT_OPTION = {
  configs: 'formOptions',
  data: 'formData',
  key: 'formItem.prop'
};

function getComponent(com) {
  return Array.isArray(com) ? com[0] : com;
}

function insertThis(arr, obj) {
  let { cKey, tKey } = obj;
  let _arr = arr;
  if (!Array.isArray(arr)) {
    _arr = [arr];
  }
  return _arr.map(fn=>{
    return (...argv) => {
      let com = getComponent(this.$refs[cKey]);
      let targetCom = getComponent(this.$refs[tKey]);
      fn.bind(com)(...argv, {
        cCom: com,
        tCom: targetCom,
        ...obj
      });
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
  if (checkType(callback, 'Array')) {
    map[prop][eventName].push(...callback);
  } else if (checkType(callback, 'Function')) {
    map[prop][eventName].push(callback);
  }
}

export default (options) => {
  let { configs, key, data } = {...DEFAULT_OPTION, ...options};
  return {
    computed: {
      listenersMap() {
        let map = {};
        this[configs].forEach((op, index)=>{
          let linkListeners = op.linkListeners;
          let listeners = op.listeners;
          let key = this.getKey(op, index);
          let argvObj = {
            cKey: key,
            cOption: op,
            configs: this[configs],
            data: this[data],
          };
          if (linkListeners) {
            Object.keys(linkListeners).forEach(prop => {
              Object.keys(linkListeners[prop]).forEach(eventName => {
                let lis = linkListeners[prop][eventName];
                insertFn(map, prop, eventName, insertThis.bind(this)(lis, {
                  tKey: prop,
                  tOption: this[configs].filter(obj=>this.getKey(obj) === prop)[0],
                  ...argvObj
                }));
              });
            });
          }
          if (listeners) {
            Object.keys(listeners).forEach(eventName => {
              insertFn(map, key, eventName, insertThis.bind(this)(listeners[eventName], {
                tKey: key,
                tOption: op,
                ...argvObj
              }));
            });
          }
        });
        return map;
      }
    },
    methods: {
      getKey(obj, index) {
        let _key = key.split('.').reduce((_obj, _key) =>{
          return _obj[_key];
        }, obj);
        return _key !== undefined ? _key : index;
      }
    }
  };
};
