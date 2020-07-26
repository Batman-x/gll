<template>
  <div class="echarts">
    <div id="main" style="width:100%; height:400px"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    setecharts() {
      this.myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: this.options.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.options.lengend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // x轴数据
        xAxis: {
          type: "category",
          data: this.options.xdata
        },
        // y轴数据
        yAxis: {
          type: "value"
        },
        series: this.options.series
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    }
  },
  mounted() {
    // setTimeout(()=>{
    this.setecharts();
    // },1000)
  },
  // 深度监听
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.myChart.setOption({
          title: {
            text: newVal.title
          },
          legend: {
            data: newVal.lengend
          },
          xAxis: {
            data: newVal.xdata
          },
          series:newVal.series
        });
      },
    deep: true
    },
  }
};
</script>

<style lang="less" scoped>
</style>