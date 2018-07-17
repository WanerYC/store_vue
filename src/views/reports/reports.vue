<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="数据统计" level2="数据报表"></my-breadcrumb>
  </el-card>
</template>

<script>
// import 'echarts.min.js';
// var myChart = echarts.init(document.getElementById('main'));
export default {
  data() {
  //   methods: {
  //     $.get('data.json').done(function (data) {
  //       myChart.setOption({
  //           title: {
  //               text: '异步数据加载示例'
  //           },
  //           tooltip: {},
  //           legend: {
  //               data:['销量']
  //           },
  //           xAxis: {
  //               data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  //           },
  //           yAxis: {},
  //           series: [{
  //               name: '销量',
  //               type: 'bar',
  //               data: [5, 20, 36, 10, 10, 20]
  //           }]
  //       });
  //     });
  //   }
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}
</style>
