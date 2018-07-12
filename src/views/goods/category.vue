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
      height="700px"
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效">
        <template slot-scope="scope">
           <!-- <span v-if="scope.row.cat_deleted">有效</span>
           <span v-else>无效</span> -->
           {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
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
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data: resData } = await this.$http.get('categories?type=3');
      // console.log(resData);
      const { data } = resData;
      // console.log(data);
      this.list = data;
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
