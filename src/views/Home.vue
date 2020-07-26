<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-dingdan1" style="color:red"></i>
          <div class="box">
            <h1>总订单</h1>
            <p>125,254,55</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-qian" style="color:#f60"></i>
          <div class="box">
            <h1>总销售额</h1>
            <p>125,254,55</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-dingdan" style="color:green"></i>
          <div class="box">
            <h1>今日订单数</h1>
            <p>125,254,55</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconfont icon-qian4" style="color:#0ff"></i>
          <div class="box">
            <h1>今日销售额</h1>
            <p>125,254,55</p>
          </div>
        </div>
      </el-col>
    </el-row>


    <!-- 内容部分 -->
    <el-card class="box-card">
      <div class="text item">
        <!-- 报表 -->
        <!-- <echarts v-if="isshow" :options="options"> -->
        <echarts :options="options">

        </echarts>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from '../components/echarts/echarts.vue'
import {gettaotaldata} from '../api/totaldata'
export default {
    components:{
      echarts
    },
    data(){
      return{
        options:{
          title:'数据统计',
          lengend:['订单','销售额'],
          xdata:[],
          series:[],
        },
        // isshow:false
      }
    },
     methods:{
      //  获取报表数据
        async getdata(){
           let { totalOrder,totalAmount,todayOrder,totayAmount,xData ,amountData,orderData} =  await gettaotaldata()
           this.options.xdata = xData;
           this.options.series = [
          {
            name: '订单',
            type: "line",
            step: "middle",
            data:amountData
          },
          {
            name:'销售额',
            type: "line",
            step: "end",
            data: orderData
          }
        ];

          // this.isshow = true
         },
    },

    mounted(){
      // 获取报表数据
         this.getdata()
    }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    display: flex;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    i {
      font-size: 70px;
    }
    .box {
      text-align: center;

      h1 {
        font-size: 20px;
        color: #aaa;
        margin-bottom: 10px;
      }
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
</style>