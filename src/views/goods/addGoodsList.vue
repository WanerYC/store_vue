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
          <!-- <el-form-item>
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
        </el-form>
        <el-button>下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
        商品图片
      </el-tab-pane>

      <!-- 富文本编译区 -->
      <el-tab-pane label="商品详情">
        <quill-editor
          class="quillEditor"
          v-model="form.goods_introduce"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
        <el-row>
          <el-col :span="8" class="Btns">
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
            <el-button type="info">取消</el-button>
          </el-col>
        </el-row>
        <!-- <el-button type="primary" @click="handleAdd">立即创建</el-button>
        <el-button type="info">取消</el-button> -->
      </el-tab-pane>
    </el-tabs>
   </el-card>
</template>

<script>
// 富文本编辑器
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

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
        goods_cat: '',
        goods_introduce: ''
      }
      // editorOption: {
      //   // some quill options
      // }
    };
  },
  components: {
    categoryCascader,
    quillEditor
  },
  methods: {
    async handleAdd() {
      // console.log(this.form);
      const res = await this.$http({
        url: 'goods',
        method: 'post',
        data: this.form
      });
      console.log(res);
      const { meta: { status, msg } } = res.data;
      if (status === 201) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    handlegaibianle(data) {
      // console.log(data);
      this.form.goods_cat = data.join(',');
      // console.log(this.form.goods_cat);
    },

    // 富文本编辑器方法
    // 文本框失去焦点时触发
    onEditorBlur(quill) {
      console.log('editor blur!', quill);
      console.log(this.form.goods_introduce);
    },
    // 文本框获取焦点时触发
    onEditorFocus(quill) {
      console.log('editor focus!', quill);
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text);
      this.content = html;
    }
  // },
  // computed: {
  //   editor() {
  //     return this.$refs.myQuillEditor.quill;
  //   }
  // },
  // mounted() {
  //   console.log('this is current quill instance object', this.editor);
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

/* .quillEditor {
  height: 300px;
} */

/* .Btns {
  margin: 10px 0;
} */
</style>
