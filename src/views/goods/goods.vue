<template>
   <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input placeholder="请输入内容" clearable class="searchInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
            prop="goods_name"
            label="商品名称"
            width="180">
      </el-table-column>
      <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="180">
      </el-table-column>
      <el-table-column
          prop="mobile"
          label="创建时间">
      </el-table-column>
      <el-table-column
        label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmData('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
      // 表格
      list: [],
      loading: false
    };
  },
  methods: {
    handleAddGood () {
      alert('添加商品');
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}

.addBtn {
  margin: 10px 0;
}

.searchArea {
  margin: 10px 0;
}

.searchArea .searchInput {
width: 350px;
}
</style>
