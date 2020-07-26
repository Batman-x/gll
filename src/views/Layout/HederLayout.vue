<template>
  <div class="header-layout">
    <!--面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in setItem" :key="item.title"  :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="header-right">
      <el-dropdown @command="clickme">
        <span class="el-dropdown-link">
          欢迎你，{{info.account}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="melogin">个人中心</el-dropdown-item>
          <el-dropdown-item command="dellogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar icon="jpg" :size="50" :src="info.imgUrl"></el-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userinfo } from '../../api/account'
export default {
  data() {
    return {
      info:{
        account:'',
        imgUrl:''
      },
      setItem:[]
    }
  },
  watch:{
    "$route.path"(){
        this.router(this.$route)
        // console.log(this.$route.matched);
        

    }
  },
  methods: {
    // 计算路由
    router(route){
      let arr = [
        {title:'首页',path:'/home'}
      ];
      route.matched.forEach(item =>{
        if(item.meta.title){
            arr.push(
              {
                title:item.meta.title,
                path:item.path
              }
            )
        }
        // console.log(item);
        
      })
      // 赋值渲染
      this.setItem = arr;
      
    },
    //获取名字
    async getaccount(){
        let { accountInfo } = await userinfo()
        this.info = accountInfo;


        localStorage.setItem('info',JSON.stringify(this.info))
    },
    clickme(command) {
    //  console.log(command);
     if(command === 'melogin'){
       this.$router.push('/account/admin')
     }else{
       this.$router.push('/login')
       localStorage.clear()
     }
      }
    },
    created(){
        this.getaccount()
        // 获取头部的信息   
        this.$bus.$on('adminimg',()=>{
            this.getaccount()
        })

        this.router(this.$route)
        // console.log(this.$route);
        
    }
  
};
</script>

<style lang="less" scoped>
.header-layout {
  flex: 0 0 1;
  background: #03263c;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  .el-breadcrumb {
    /deep/span {
      color: #aaa;
    }
  }
  .header-right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .el-dropdown {
      margin-right: 15px;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>