import alSwitch from './main.vue';

/* istanbul ignore next */
alSwitch.install = function(Vue) {
  Vue.component(alSwitch.name, alSwitch);
};

export default alSwitch;