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
                    <!-- 一级菜单 -->
                    <el-submenu
                        :index="item.id + ''"
                        v-for="item in menus"
                        :key="item.id">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                            :index="'/'+item1.path"
                            v-for="item1 in item.children"
                            :key="item1.id">
                            <i class="el-icon-menu"></i>
                            {{ item1.authName }}
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
  data() {
    return {
      menus: []
    };
  },
  // 判断是否登录
  //  beforeCreate() {
  //    // 从sessionStorage 获取token判断是否有
  //    const token = sessionStorage.getItem('token');
  //    if (!token) {
  //      this.$router.push({ name: 'login' });
  //      // 提示一下
  //      this.$message.warning('请登录');
  //    }
  //  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data: resData } = await this.$http.get('menus');
      const { data, meta: { status, msg } } = resData;
      console.log(data);
      if (status === 200) {
        this.menus = data;
      } else {
        this.$message.error(msg);
      }
    },
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
