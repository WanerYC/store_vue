<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>

    <!--  内容表格 -->
    <el-table
      height="600px"
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    async loadData () {
      // // 获取token  已经在axios的拦截器中设置
      // const token = sessionStorage.getItem('token');
      // // 请求头中设置token
      // this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get('rights/list');
      // console.log(res);
      const data = res.data;
      console.log(data);
      this.list = data.data;
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
  /* overflow: auto; */
}

.elbreadcrumb {
  margin-bottom: 10px;
}
</style>
