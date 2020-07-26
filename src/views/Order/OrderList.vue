<template>
  <div class="order-list">
    <Card>
      <!-- 头部 -->
      <div slot="title">
        <el-form :inline="true" :model="orderlist" label-width="80px" class="demo-form-inline">
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="orderlist.orderNo" placeholder="订单号"></el-input>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="orderlist.consignee" placeholder="收货人"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号">
            <el-input v-model="orderlist.phone" placeholder="手机号"></el-input>
          </el-form-item>

          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="orderlist.orderState" placeholder="订单状态">
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
            </el-select>
          </el-form-item>
          <!-- 选择时间 -->
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="orderlist.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button  @click="onSubmit2">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 内容 -->
      <div slot="content">
        <el-table :data="tableData" border style="width: 100%" max-height="250px" max-width="480px">
          <el-table-column fixed="left" prop="orderNo" label="订单号" width="80"></el-table-column>

          <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>

          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>

          <el-table-column prop="consignee" label="收货人" width="90"></el-table-column>

          <el-table-column prop="deliverAddress" label="地址" width="100"></el-table-column>

          <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>

          <el-table-column prop="remarks" label="用户备注" width="80"></el-table-column>

          <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>

          <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import moment from 'moment'
import { orderlist } from '../../api/order'
export default {
  components: {
    Card
  },
  data() {
    return {
      orderlist: {
      },
      tableData: [
        
      ],
      // 总条数
      total:0,
      // 显示条数
      pageSize:5,
      // 当前页
      currentPage:1,
    };
  },
  created(){
    this.getorderlist()
  },
  methods: {
    //获取列表内容
    async getorderlist(){
        let { total ,data }=await orderlist({
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          orderNo:this.orderlist.orderNo,
          consignee:this.orderlist.consignee,
          phone:this.orderlist.phone,
          orderState:this.orderlist.orderState,
          date:JSON.stringify(this.orderlist.date),
        })
        data.forEach(item =>{
          item.deliveryTime = moment(item.deliveryTime).format('YYYY-MM-DD HH:mm:ss')
          item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
        })
        this.tableData = data;
        this.total = total
    },

    //   查询
    onSubmit() {
      this.getorderlist()
    },
    // 重置
    onSubmit2(){
      this.orderlist = {
        orderNo:'',
        consignee:'',
        phone:'',
        orderState:'',
        date:[]
      }
    },

    // 查看
    see(row) {
        console.log(row);
        this.$router.push('/order/order-all')

        localStorage.setItem('order',JSON.stringify(row))
    },

    // 显示条数改变时触发
     handleSizeChange(val) {
       this.pageSize = val;
       this.getorderlist()
     },
    //  当前页
      handleCurrentChange(val) {
       this.currentPage = val;
       this.getorderlist()
      }
  }
};
</script>

<style lang="less" scoped>
.order-list {
  .el-form {
    /deep/.el-form-item__label {
      color: #fff;
    }
  }
.el-pagination{
  background: #fff;
  padding: 30px 20px;
}
}
</style>