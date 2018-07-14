<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <el-button plain class="addBtn" @click="handleAddGoods" type="success">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      border
      v-loading="loading"
      :data="list"
      style="width: 100%">
      <el-tree-grid
        label="分类名称"
        prop="cat_name"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        :indentSize= "30">

      </el-tree-grid>
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
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
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleeiditShow(scope.row)" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"  @click="handleDelete(scope.row)" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="elpagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40, 50, 60]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>

    <!-- 添加分类表单 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="AdddialogVisible">
      <!-- 表单内容 -->
      <el-form ref="Addform" :model="Addform">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="Addform.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分类级别">
          <!-- <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            :props="{
              label: 'cat_name',
              value: 'cat_id',
              children: 'children'
            }"
            change-on-select>
          </el-cascader> -->
          <categoryCascader typr="3"></categoryCascader>
        </el-form-item>
      </el-form>
      <!-- 按键内容 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑商品分类 -->
    <el-dialog
      title="编辑商品分类"
      :visible.sync="editdialogVisible">
      <!-- 表单内容 -->
      <el-form ref="editform" :model="editform">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editform.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按键内容 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleedit">确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
// 引入级联 组件
// 引入三级联动
import categoryCascader from '@/components/CategoryCascader.vue';
// npm install element-tree-grid 安装组件
// 引入组件
// const ElTreeGrid = require('element-tree-grid');
// Vue.component(ElTreeGrid.name,ElTreeGrid);
import ElTreeGrid from 'element-tree-grid';
// 局部注册组件

export default {
  data() {
    return {
      list: [],
      loading: true,
      // 分页数据
      pagenum: 1,
      pagesize: 5,
      total: 0,
      // 添加商品弹出框
      AdddialogVisible: false,
      Addform: {
        cat_name: ''
      },
      selectedOptions: [],
      options: [],
      // 编辑商品分类
      editdialogVisible: false,
      editform: {}
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // pagenum=${this.pagenum}&pagesize=${this.pagesize}
      // console.log(resData);
      this.loading = false;
      const { data: { result, total } } = resData;
      // console.log(data);
      this.list = result;
      // 获取总条数
      this.total = total;
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
    // 添加商品分类  -- 添加商品分类弹出框
    async handleAddGoods() {
      this.AdddialogVisible = true;
      // 发送后台请求
      const { data: resData } = await this.$http.get('categories?type=2');
      // console.log(resData.data);
      this.options = resData.data;
    },
    // 添加商品分类
    async handleChange() {
      // console.log(selectedOptions);
      const formData = {
        ...this.Addform,
        cat_pid: this.selectedOptions[this.selectedOptions.length - 1],
        cat_level: this.selectedOptions.length
      };
      // console.log(formData);
      // 发送请求
      const { data: resData } = await this.$http({
        method: 'post',
        url: 'categories',
        data: formData
      });
      // console.log(resData);
      // console.log(resData.data);
      const { meta: { msg, status } } = resData;
      if (status === 201) {
        this.$message.success(msg);
        // 关闭当前的弹出框
        this.AdddialogVisible = false;
        // 重新加载列表数据
        this.loadData();
        // 清空表单数据
        // 清空表单数据
        this.$refs['Addform'].resetFields();
        this.selectedOptions = []; // 手动清空级联选择器组件选择的状态
      } else {
        this.$message.error(msg);
      }
    },
    // 编辑商品分类
    handleeiditShow(cat) {
      this.editform = cat;
      this.editdialogVisible = true;
      console.log(cat);
    },
    async handleedit() {
      // this.editform
      // console.log(this.editform.cat_id);
      // console.log(this.editform.cat_name);
      const catid = this.editform.cat_id;
      const catname = this.editform.cat_name;
      const { data: resData } = await this.$http({
        url: `/categories/${catid}`,
        method: 'put',
        data: {
          catname
        }
      });
      const { meta: { status, msg } } = resData;
      if (status === 200) {
        this.$message.success(msg);
        // 重新加载数据
        this.loadData();

        // 关闭窗口
        this.editdialogVisible = false;
      } else {
        this.$message.error(msg);
      }
    },
    // 删除商品分类
    async handleDelete(cat) {
      // console.log(cat);
      const catid = cat.cat_id;
      // console.log(catid);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        const { data: resData } = await this.$http.delete(`categories/${catid}`);
        const { meta: { status, msg } } = resData;
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
  },
  components: {
    ElTreeGrid,
    categoryCascader
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

.elpagination {
  margin: 10px -10px;
}
</style>
