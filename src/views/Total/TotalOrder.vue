<template>
  <div class="total-order">
    <!-- 头部 -->
    <div class="total-header">
      <span>时间范围</span>
       <el-date-picker
      v-model="ordertotal.date"
      value-format="yyyy-MM-DD HH:mm:ss"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

      <!-- 按钮 -->
      <el-button @click="btndata" type="primary" style="margin-left:15px">查询</el-button>
    </div>

    <!-- 主体内容 -->
    <Card>
      <div slot="title">订单统计</div>
      <!-- 内容 -->
      <div slot="content" class="content">
        <echarts :options="options"></echarts>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import echarts from "../../components/echarts/echarts.vue";
import {getordertotal} from '../../api/totaldata';
import moment from 'moment'
export default {
  components: {
    Card,
    echarts
  },
  data() {
    return {
      ordertotal:{
        date:[],
      },
       options:{
          title:'订单统计',
          lengend:['订单','金额'],
          xdata:[],
          series:[
            {
              name:'订单金额',
              type:'line',
              data:[]
            }
          ]
        }
    };
  },
  methods:{
     async getorder(){
        let {data} = await  getordertotal({date:JSON.stringify(this.ordertotal.date)})
        this.options.xdata = data.map(v=>{
           return  moment(v.orderTime).format('YYYY-MM-DD HH:mm:ss')
        })

        this.options.series[0].data = data.map(v=>{
           return v.orderAmount
        })

      },
      btndata(){
        this.getorder()
      }
  },
  created(){
    this.getorder()
  }
};
</script>

<style lang="less" scoped>
.total-order {
  height: 100%;
  .total-header {
    margin-bottom: 30px;
    span {
      color: #fff;
      padding-right: 10px;
    }
  }
}
</style>