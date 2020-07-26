<template>
  <div class="admin">
    <card>
      <div slot="title">管理员信息</div>

      <div slot="content" class="content">
        <div class="box">
          <i>管理员id:</i>
          <span>{{accountInfo.id}}</span>
        </div>
        <div class="box">
          <i>账号:</i>
          <span>{{accountInfo.account}}</span>
        </div>
        <div class="box">
          <i>用户组:</i>
          <span>{{accountInfo.userGroup}}</span>
        </div>
        <div class="box">
          <i>创建时间:</i>
          <span>{{accountInfo.ctime | ctimes}}</span>
        </div>

        <div class="box2">
          <span>管理员头像</span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgsrc + imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>


        <div class="box">
          <i></i>
          <el-button @click="btnimg">确定修改</el-button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import {avataredit} from '../../api/account'
import moment from 'moment'
export default {
  components: {
    Card
  },
  data() {
    return {
      imgUrl: "",
      imgsrc:'http://127.0.0.1:5000/upload/imgs/acc_img/',
      accountInfo:{
        id:'',
        account:'',
        ctime:'',
        imgUrl:'',
        userGroup:""
      }
    };
  },
  created(){
      // this.getinfo()
      this.accountInfo = JSON.parse(localStorage.getItem('info'))
  },
  methods: {
    // 封装一个获取个人信息的页面
    // async getinfo(){
    //   let {accountInfo} = await userinfo()
    //   // accountInfo.ctime = moment(accountInfo.ctime).format("YYYY-MM-DD HH:mm:ss")
    //   this.accountInfo = accountInfo
    // },
    
    // 上传成功的函数
    handleAvatarSuccess(res) {
      console.log(res);
      let { code ,msg ,imgUrl} = res;
      this.imgUrl = imgUrl
      if(code == 0){
        this.$message({
          type:"success",
          message:msg
        })
      }else{
        this.$message.error(msg)
      }
    },
    // 修改头像
    async btnimg(){
      let {code , msg} = await avataredit({imgUrl:this.imgUrl})
      if(code == 0){
        this.$message({
          type:'success',
          message:msg
        })
        this.$bus.$emit('adminimg')
      }else{
        this.$message.error(msg)
      }
    },
    // 上传之前的函数
    beforeAvatarUpload(file) {}
  },
  filters:{
      ctimes(ctime){
          return moment(ctime).format("YYYY-MM-DD HH:mm:ss")
      }
    },
};
</script>

<style lang="less" scoped>
.admin {
  .content {
    .box {
      color: #fff;
      padding: 20px 0;
      border-bottom: 1px solid #fff;
      i {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
    }
    .box2 {
      margin-top: 30px;
      display: flex;
      align-items: center;
      span {
        color: #fff;
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
    }

    /deep/.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>