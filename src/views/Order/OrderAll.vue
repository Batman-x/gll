<template>
  <div class="order-all">
    <Card>
      <div slot="title">订单详情</div>

      <div slot="content">
        <el-form ref="form" :model="orderedit" label-width="80px">
          <el-form-item label="订单号">
            <el-input v-model="orderedit.orderNo"></el-input>
          </el-form-item>

          <el-form-item label="下单时间">
            <el-date-picker v-model="orderedit.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="送达时间">
            <el-date-picker v-model="orderedit.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="电话">
            <el-input v-model="orderedit.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="orderedit.consignee"></el-input>
          </el-form-item>

          <el-form-item label="送货地址">
            <el-input v-model="orderedit.deliverAddress"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="orderedit.remarks"></el-input>
          </el-form-item>

          <el-form-item label="订单金额">
            <el-input v-model="orderedit.orderAmount"></el-input>
          </el-form-item>

          <el-form-item label="订单状态">
            <el-input v-model="orderedit.orderState"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定修改</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card";
import { orderdetail, orderedit } from "../../api/order";
export default {
  components: {
    Card
  },
  data() {
    return {
      orderedit: {
        orderNo: "",
        orderTime: [],
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: [],
        remarks: "",
        orderAmount: "",
        orderState: ""
      }
    };
  },
  created() {
    this.order = JSON.parse(localStorage.getItem("order"));
    this.orderedit = this.order;
  },
  methods: {
    async onSubmit() {
      let { code, msg } = await orderedit({
        id: this.order.id,
        orderNo: this.orderedit.orderNo,
        orderTime: this.orderedit.orderTime,
        phone: this.orderedit.phone,
        consignee: this.orderedit.consignee,
        deliverAddress: this.orderedit.deliverAddress,
        deliveryTime: this.orderedit.deliveryTime,
        remarks: this.orderedit.remarks,
        orderAmount: this.orderedit.orderAmount,
        orderState: this.orderedit.orderState
      });
     if(code === 0){
        this.$message({
          type:'success',
          message:msg
        })
        this.$router.push('/order/order-list')
     }else{
       this.$message.console.error(msg);
       
     }
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 480px;
  margin-left: 10%;
  /deep/.el-form-item__label {
    color: #fff;
  }
}
</style>