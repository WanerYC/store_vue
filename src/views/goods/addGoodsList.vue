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
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
           <el-form-item label="商品分类">
             <!-- 三级联动组件 -->
             <categoryCascader @gaibianle="handlegaibianle" type="3"></categoryCascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>

   </el-card>
</template>

<script>
// 引入三级联动
import categoryCascader from '@/components/CategoryCascader.vue';
export default {
  data() {
    return {
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      }
    };
  },
  components: {
    categoryCascader
  },
  methods: {
    handleAdd() {
      console.log(this.form);
    },
    handlegaibianle(data) {
      console.log(data);
      this.form.goods_cat = data.join(',');
      console.log(this.form.goods_cat);
    }
  }
};
</script>

<style>
.mybreadcrumb {
  margin-bottom: 10px;
}

.box-card {
  height: 100%;
  overflow: auto
}
</style>
