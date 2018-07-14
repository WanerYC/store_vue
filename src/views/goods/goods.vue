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
            width="660">
      </el-table-column>
      <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="100">
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmData('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDeletGoods(scope.row)" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 30, 40, 50, 60]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 表格
      list: [],
      loading: false,
      // 分页
      total: 0,
      pagesize: 5,
      pagenum: 1
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const { data: resData } = await this.$http({
        url: 'goods',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(resData);
      const { data } = resData;
      console.log(data);
      this.list = data.goods;
      this.total = data.total;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.loadData();
    },
    handleAddGood () {
      alert('添加商品');
    },
    // 删除商品
    async handleDeletGoods (good) {
      // console.log(good);
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        /* const { data: resData } = await this.$http({
          url: 'goods',
          params: {
            id:good.goods_id
          },
          method: 'delete'
        }); */
        const { data: resData } = await this.$http.delete(`goods/${good.goods_id}`);
        const { meta: { status, msg } } = resData;
        console.log(resData.meta);
        if (status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 刷新页面
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
