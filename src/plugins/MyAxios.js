import axios from 'axios';

var MyAxios = {};
MyAxios.install = function (Vue) {
  // axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // Vue.prototype.$http = axios;

  // 创建自定义的axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
  Vue.prototype.$http = instance;
};

export default MyAxios;
