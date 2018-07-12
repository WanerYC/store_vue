<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>

    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <el-button plain class="addBtn">添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      v-loading="loadding"
      border
      stripe
      :data="list"
      style="width: 100%">
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag closable type="success" @close="handleClose"> {{ 'hhhh' }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loadding: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loadding = true;
      const res = await this.$http.get('roles');
      this.loadding = false;
      // console.log(res);
      const data = res.data;
      console.log(data);
      this.list = data.data;
    },
    handleClose() {
      console.log('关闭');
    }
  }
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
