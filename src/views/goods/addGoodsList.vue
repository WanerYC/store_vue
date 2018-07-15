<template>
  <el-card class="box-card">
     <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="添加商品" class="mybreadcrumb"></my-breadcrumb>

    <!-- 步骤条 -->
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品详情"></el-step>
    </el-steps>

    <!-- 左侧列表导航 -->
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="基本信息" name="0">
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
        <el-button @click="handleNextStep">下一步</el-button>
      </el-tab-pane>

      <!-- 上传图片区 -->
      <el-tab-pane label="商品图片" name="1">
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSccess"
          :file-list="fileList2"
          :headers="headers"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-row>
          <el-col :span="4">
            <el-button @click="handleNextStep">下一步</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 富文本编译区 -->
      <el-tab-pane label="商品详情"  name="2">
        <quill-editor
          class="quillEditor"
          v-model="form.goods_introduce"
          ref="myQuillEditor">
        </quill-editor>
        <el-row>
          <el-col :span="8" class="Btns">
            <el-button type="primary" @click="handleAdd">立即创建</el-button>
            <el-button type="info">取消</el-button>
          </el-col>
        </el-row>
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
        goods_introduce: '',
        pics: [
          // {pic: '图片路径'}
        ]
      },
      activeName: '0',
      stepActive: 0,
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      },
      fileList2: []
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

    // 点击下一步触发
    handleNextStep() {
      this.activeName++;
      this.activeName = Number.parseInt(this.activeName) + 1 + '';
      this.stepActive++;
    },
    // 处理tab标签点击事件
    handleTabClick(tab, event) {
      // tab.index 为当前标签tab的下标
      this.stepActive = tab.index - 0;
    },
    // 上传图片 upload
    handleRemove(file, fileList) {
        // console.log(file, fileList);
        // 把数组中某个元素的pic === file.response.data.tmp_path的元素移出
        const index = this.form.pics.findIndex(function(item) {
          return item.pic === file.response.data.tmp_path
        })
        console.log(index);
        if (index !== -1) {
          this.form.pics.splice(index, 1);
        }
      },
    handlePreview(file) {
      console.log(file);
    },
    // 图片上传成功时触发
    handleUploadSccess (response, file, fileList) {
      // response 接口相应结果对象
      // file 上传的文件对象
      // fileList 文件列表数组
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.form.pics.push({
        pic: response.data.tmp_path
      })
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

/* .quillEditor {
  height: 300px;
} */

/* .Btns {
  margin: 10px 0;
} */
</style>
