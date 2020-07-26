<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <LeftNav />

    <!-- 右侧 -->
    <div class="layout-right">
      <!-- 头部 -->
      <HeaderLayout />
      <!-- 主体 -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from "./LeftNav.vue";
import HeaderLayout from "./HederLayout.vue";
export default {
  components: {
    LeftNav,
    HeaderLayout
  }
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  .layout-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #aaa;
    .content {
      flex: 1;
      background: rgb(35, 47, 59);
      padding: 15px;
      overflow-y: auto;
    }
  }
}
</style>