import axios from 'axios';

var MyAxios = {};
MyAxios.install = function (Vue) {
  // axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // Vue.prototype.$http = axios;

  // 创建自定义的axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });

  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    // console.log(config);
    // console.log(config.url);
    // 在发送请求之前做些什么
    if (config.url.toLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  Vue.prototype.$http = instance;
};

export default MyAxios;
