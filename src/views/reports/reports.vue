<template>
  <el-card class='box-card'>
    <!-- 面包屑 -->
    <my-breadcrumb level1='数据统计' level2='数据报表'></my-breadcrumb>
    <div>
      <p>reports componet</p>
      <div id='main' style='width: 600px; height:400px'></div>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts';
// import 'echarts.min.js';
// var myChart = echarts.init(document.getElementById('main'));
export default {
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}
</style>
