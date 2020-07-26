<template>
  <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      class="login-form"
    >
      <!-- 用户名： -->
      <el-form-item prop="account">
        <el-input
          prefix-icon="iconfont icon-zhanghao"
          type="text"
          v-model="loginForm.account"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码： -->
      <el-form-item prop="password">
        <el-input
          @click.native="pwdType"
          @keydown.native.13="submitForm"
          prefix-icon="iconfont icon-suo"
          :suffix-icon="isOn ? 'iconfont icon-yanjing_bi' :'iconfont icon-yanjing'"
          :type="isOn?'password' : 'text'"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { chelogin } from '../api/account'
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },

      rules: {
          account:[
              {required:true,message:'请输入账号',trigger:'blur'},
              {min:3,max:6,message:'请输入3-6位字符',trigger:'blur'}
          ],
          password:[
              {required:true,message:'请输入密码',trigger:'blur'},
              {min:4,max:8,message:'长度为4-8',trigger:'blur'}
          ]
      },
      isOn: true
    };
  },
  methods: {
    // 点击登录
    submitForm() {
        this.$refs.loginForm.validate(async data =>{
            console.log(data);
            if(data){
                
                let { code , msg , token } = await chelogin(this.loginForm)

                      if(code === 0){
                        localStorage.setItem('token',token)
                        this.$message({
                        message: msg,
                        type: 'success'
                    });
                        this.$router.push('/')
                      }else{
                        this.$message.error(msg)
                      }


            }else{
                 this.$message({
                        message: '登录失败了哦',
                        type: 'error'
                    });
            }
        } ) 
        
        
    },


    pwdType(e) {
        console.log(e.target.className);
        if(e.target.className.includes('icon-yanjing')){
            this.isOn = !this.isOn
        }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: url("../assets/imgs/loginbackground.jpg") no-repeat;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 350px;
    .el-form-item {
        /deep/.el-input__inner {
          background: #03263c;
          border: 1px solid #021826;
        }
    }

    .el-button {
      width: 100%;
      background: #03263c;
      border: 1px solid #021826;
      color: #aaa;
    }
  }
}
</style>