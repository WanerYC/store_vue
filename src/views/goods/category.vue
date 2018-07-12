<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <el-button plain class="addBtn" type="success">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="是否有效">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {

};
</script>

<style>
.box-card {
  height: 100%;
}

.addBtn {
  margin: 10px 0;
}
</style>
