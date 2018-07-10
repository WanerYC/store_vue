<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <img src="/static/logo.png" alt="">
                </el-col>
                <el-col :span="19" class="midele">
                    <h2 class="title">电商管理后台</h2>
                </el-col>
                <el-col :span="1">
                    <a href="#" @click.prevent="handleLogout" class="loginout">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="aside">
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu
                :unique-opened="true"
                :router="true"
                default-active="1-1"
                class="menu">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                        </template>
                        <el-menu-item index="/users">
                            <i class="el-icon-menu"></i>
                            用户列表
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                        </template>
                        <el-menu-item index="/roles">
                            <i class="el-icon-menu"></i>
                            角色列表
                        </el-menu-item>
                        <el-menu-item index="/rights">
                            <i class="el-icon-menu"></i>
                            权限列表
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                        </template>
                        <el-menu-item index="3-1">
                            <i class="el-icon-menu"></i>
                            商品列表
                        </el-menu-item>
                        <el-menu-item index="3-2">
                            <i class="el-icon-menu"></i>
                            分类参数
                        </el-menu-item>
                        <el-menu-item index="3-3">
                            <i class="el-icon-menu"></i>
                            商品分类
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                        </template>
                        <el-menu-item index="4-1">
                            <i class="el-icon-menu"></i>
                            订单列表
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                        </template>
                        <el-menu-item index="5-1">
                            <i class="el-icon-menu"></i>
                            数据报表
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主要内容区 -->
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  // 判断是否登录
  beforeCreate() {
    // 从sessionStorage 获取token判断是否有
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.$router.push({ name: 'login' });
      // 提示一下
      this.$message.warning('请登录');
    }
  },
  methods: {
    // 退出
    handleLogout() {
      // 删除sessionStorage中的token
      sessionStorage.clear();
      // 跳转到登录页
      this.$router.push({ name: 'login' });
      // 提示
      this.$message.success('退出成功');
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}

.title {
    color: #fff;
    text-align: center;
    margin: 0;
    padding: 0;
    line-height: 60px;
}

.loginout {
    line-height: 60px;
    color: orange;
    text-decoration: none;
}

.aside {
  background-color: #d3dce6;
}

.menu {
    height: 100%;
}

.main {
  background-color: #e9eef3;
  /* height: 100%; */
}
</style>
