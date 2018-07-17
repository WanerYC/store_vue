<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="订单管理" level2="订单列表"></my-breadcrumb>

    <!-- 点击按钮移动地图 -->
    <el-button @click="handleMove" type="success">点击移动</el-button>
    <!-- 百度地图 -->
    <div id="container"></div>
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
          <template>
            <div id="app">
              <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </div>
          </template>
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
// 省市区三级联动（带“全部”选项）
import { regionDataPlus } from 'element-china-area-data';
// import func from './vue-temp/vue-editor-bridge';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 进度条
NProgress.start();
setTimeout(function(){
  NProgress.done();
}, 3000);

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
      address: {},
      // 省市区三级联动
      options: regionDataPlus,
      selectedOptions: [],
      map: null
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    // 百度地图
    this.map = new window.BMap.Map('container');
    console.log(window.BMap);
    // 创建地图实例
    var point = new window.BMap.Point(116.404, 39.915);
    // 创建点坐标
    this.map.centerAndZoom(point, 15);
    // 初始化地图，设置中心点坐标和地图级别
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
    },
    // 省市区三级联动
    handleChange (value) {
      console.log(value);
    },
    handleMove () {
      const point = new window.BMap.Point(116.404, 39.915);
      this.map.centerAndZoom(point, 15);
      const marker = new window.BMap.Marker(point); // 创建标注
      this.map.addOverlay(marker); // 将标注添加到地图中
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

#container {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
