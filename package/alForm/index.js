import alForm from './src/main';
// import wordsCount from './src/wordsCount';
const {
  Form,
  FormItem
} = require('element-ui');

alForm.install = function (Vue) {
  Vue.component(alForm.name, alForm);
  // Vue.component(wordsCount.name, wordsCount);
  Vue.use(Form);
  Vue.use(FormItem);
};
export default alForm;
