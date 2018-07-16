<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="订单管理" level2="订单列表"></my-breadcrumb>
    <!-- 表格 -->
    <el-table
      class="eltables"
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
            prop="order_number"
            label="订单编号"
            width="360">
      </el-table-column>
      <el-table-column
          prop="order_price"
          label="订单价格"
          width="100">
      </el-table-column>
      <el-table-column
          width="100"
          label="是否付款">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" v-if="scope.row.pay_status === '0'" plain>未付款</el-button>
          <el-button size="mini" type="danger" v-else-if="scope.row.pay_status === '1'" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column
          prop="is_send"
          width="100"
          label="是否发货">
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="220">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmData('YYYY-MM-DD  HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleShowEditDialog(scope.row)" plain></el-button>
          <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" @click="handleShowSetRoleDialog(scope.row)" plain></el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20, 25, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>

    <!-- 修改地址框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="editShowAddress">
      <el-form label-position="left" label-width="80px" :model="address">
        <el-form-item label="省市区/县">
          <el-input v-model="address.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="address.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editShowAddress = false">取 消</el-button>
        <el-button type="primary" @click="editShowAddress = false">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      // 分页
      pagenum: 1,
      pagesize: 5,
      total: 0,
      // 修改地址
      editShowAddress: false,
      address: ''
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData () {
      this.loading = true;
      const { data: resData } = await this.$http({
        url: 'orders',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      this.loading = false;
      console.log(resData.data);
      this.list = resData.data.goods;
      this.total = resData.data.total;
    },
    handleSizeChange (val) {
      console.log('handleSizeChange', val);
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange (val) {
      console.log('handleCurrentChange', val);
      this.pagenum = val;
      this.loadData();
    },
    handleShowEditDialog() {
      this.editShowAddress = true;
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto
}

.eltables {
  margin-top: 10px;
}

</style>
