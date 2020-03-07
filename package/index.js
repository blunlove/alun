import alDialog from './alDialog';
import alForm from './alForm';
import controls from './controls';
import container from './container';
const components = {
  alDialog,
  alForm,
  ...controls,
  ...container
};
const install = function(Vue) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key]);
  });
};
export default {
  install,
  ...components
};
