import Vue from 'vue';
import Router from 'vue-router';
// 导入组件
import Login from '@/views/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {name: 'home', path: '/', redirect: {name: 'login'}}
  ]
});
