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
    change-on-select>
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
      options: []
    };
  }
};
</script>

<style>

</style>
