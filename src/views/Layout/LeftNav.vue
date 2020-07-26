<template>
  <div class="leftnav">
    <div class="box"><i class="iconfont icon-qian"></i>外卖管理系统</div>
    <el-menu
      :default-active="setactive"
      class="el-menu-vertical-demo"
      background-color="#03263c"
      text-color="#aaa"
      collapse-transition
      unique-opened
      router
    >

<!-- 首页 -->
    <el-menu-item index="/home">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>



    <!-- 订单管理 -->
     <el-menu-item index="/order/order-list">
        <i class="el-icon-setting"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>



    <!-- 商品管理 -->
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
          <el-menu-item index="/goods/goods-add">添加商品</el-menu-item>
          <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
      </el-submenu>


        <!-- 店铺管理 -->
         <el-menu-item index="/shop">
        <i class="el-icon-setting"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>


    <!-- 账号管理 -->
     <el-submenu index="/account">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>账号管理</span>
        </template>
          <el-menu-item index="/account/account-list">账号列表</el-menu-item>
          <el-menu-item index="/account/account-add">添加账号</el-menu-item>
          <el-menu-item index="/account/account-pwd">修改密码</el-menu-item>
      </el-submenu>


    <!-- 商品统计 -->
      <el-submenu index="/total">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品统计</span>
        </template>
          <el-menu-item index="/total/total-goods">商品统计</el-menu-item>
          <el-menu-item index="/total/total-order">订单统计</el-menu-item>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
export default {
  data(){return{}},
  computed:{
    setactive(){
      if(this.$route.path === '/order/order-all')
      return '/order/order-list'


      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.leftnav {
  flex: 0 0 200px;
  height: 100%;
  background: #03263c;
  .box{
    width: 100%;
    color: #aaa;
    text-align: center;
    padding: 15px 0 0 ;
    i{
    color: rgb(255, 217, 0);
    font-size: 35px;
    padding-right: 5px;
  }
  }
  .el-menu{
      border: 0;
  }
  /deep/.el-submenu{
      
  /deep/.el-menu-item {
      background: crimson ;
      padding-left: 70px !important;
  }
  }
}
</style>