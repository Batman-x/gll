<template>
  <div class="crad">
    <!-- 封装卡片组件 -->

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <slot name="title"></slot>
      </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box-card{
    height: 100%;
    background:rgb(33, 97, 100);
    .clearfix{
        color: #fff;
    }
}
</style>