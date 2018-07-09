import axios from 'axios';
import Vue from 'vue';

var MyAxios = {};

MyAxios.install = function() {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  Vue.prototype.$http = axios;
};

export default MyAxios;
