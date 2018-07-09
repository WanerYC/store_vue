<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <img src="/static/logo.png" alt="">
                </el-col>
                <el-col :span="19">
                    <h2 class="title">电商管理后台</h2>
                </el-col>
                <el-col :span="1">
                    <a href="#" class="loginout">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="aside">
            <el-aside width="200px">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

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

.main {
  background-color: #e9eef3;
  /* height: 100%; */
}
</style>
