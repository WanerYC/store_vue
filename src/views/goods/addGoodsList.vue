<template>
  <el-card class="box-card">
     <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="添加商品" class="mybreadcrumb"></my-breadcrumb>

    <!-- 步骤条 -->
    <el-steps :active="2" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品详情"></el-step>
    </el-steps>

    <!-- 左侧列表导航 -->
    <el-tabs tab-position="left" style="height: 300px;">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>

   </el-card>
</template>

<script>
export default {

};
</script>

<style>
.mybreadcrumb {
  margin-bottom: 10px;
}

.box-card {
  height: 100%;
}
</style>
