import alContentBox from './main.vue';

/* istanbul ignore next */
alContentBox.install = function(Vue) {
  Vue.component(alContentBox.name, alContentBox);
};

export default alContentBox;