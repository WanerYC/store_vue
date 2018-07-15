<template>
  <el-cascader
    expand-trigger="hover"
    :options="options"
    v-model="selectedOptions"
    :props="{
      label: 'cat_name',
      value: 'cat_id',
      children: 'children'
    }"
    @change="handleChange"
    change-on-select
    placeholder="默认是一级分类"
    clearable>
  </el-cascader>
</template>

<!--  调用 -->
<!--  <CategoryCascader type="3"></CategoryCascader> -->

<script>
export default {
  // props: ['type'],
  props: {
    type: {
      type: [String, Number],
      default: 2
    }
  },
  async created() {
    // 发送后台请求
    const { data: resData } = await this.$http.get('categories', {
      params: {
        type: this.type
      }
    });
    // console.log(resData.data);
    this.options = resData.data;
  },
  data () {
    return {
      options: [],
      selectedOptions: []
    };
  },
  methods: {
    handleChange() {
      // console.log(this.selectedOptions);
      // 对外部 发送一个自定义事件,外部为使用该组件的父组件
      this.$emit('gaibianle', this.selectedOptions);
    }
  }
};
</script>

<style>

</style>
