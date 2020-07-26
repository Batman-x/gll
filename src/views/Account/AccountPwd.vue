<template>
    <div class="account-pwd">
    <Card>
        <!-- 头部插入 -->
        <span slot='title'>修改密码</span>


        <!-- 内容插入 -->
        <div slot="content">
            <el-form
      :model="accform"
      status-icon
      :rules="rules"
      ref="accform"
      class="login-form"
      label-width="100px"
    >
      <!-- 原密码 -->
      <el-form-item prop="OriginalPwd" label="原密码">
        <el-input
         prefix-icon="iconfont icon-suo"
          v-model="accform.OriginalPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码： -->
      <el-form-item prop="newPwd" label="密码">
        <el-input
          prefix-icon="iconfont icon-suo"
          v-model="accform.newPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>


      <!-- 密码： -->
      <el-form-item prop="topassword" label="确认密码">
        <el-input
          prefix-icon="iconfont icon-suo"
          v-model="accform.topassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>


    
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button  @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
        </div>
    </card>
    </div>
</template>

<script>
import Card from '../../components/Card/Card.vue'
import { ACC_PWD } from '../../utils/reg'
import { checkoldpwd ,editpwd} from '../../api/account'
    export default {
        components:{
            Card
        },
        data(){
          //旧密码  验证旧密码
          let OriginalPwd = async(rule , value ,callback)=>{
               if(!value){
                 callback(new Error('请输入旧密码'))
                }else{
                    let { code , msg } = await checkoldpwd({oldPwd:value})
                  if(code === "00"){
                    this.$message({
                      type:'success',
                      message:msg
                    })
                    callback()
                  }else{
                    this.$message.error(msg)
                  }

                }
          };

          // 新密码
          let newPwd = (rule , value ,callback)=>{
              if(!value){
                callback(new Error('请输入新密码'))
              }else if(!ACC_PWD.test(value)){
                callback(new Error('中文、英文、数字、下划线、4-16个字符'))
              }else{
                if(this.accform.topassword){
                      this.$refs.accform.validateField('topassword')
                  }
                  callback()
              }
          };

          // 确认新密码
          let topassword = (rule , value , callback)=>{
            if(!value){
              callback(new Error('请输入密码'))
            }else if(value != this.accform.newPwd){
              callback(new Error('两次输入的密码不一致'))
            }else{
              callback()
            }
          }
            return{
                accform:{
                    OriginalPwd:'',
                    newPwd:'',
                    topassword:''
                },
                rules:{
                    OriginalPwd:{ validator: OriginalPwd, trigger: 'blur' },
                    newPwd:{ validator: newPwd, trigger: 'blur' },
                    topassword:{ validator: topassword, trigger: 'blur' },
                }
            }
        },
        methods:{
          // 提交
            submitForm(){
                this.$refs.accform.validate(async vali =>{
                  if(vali){
                   let { code , msg } = await editpwd({newPwd:this.accform.newPwd}) 
                      if(code === 0){
                        this.$message({
                          type:"success",
                          message:msg
                        })
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                      }else{
                        this.$message.error(msg)
                      }
                  }else{
                    console.log('登录失败');
                    
                  }
                })
            },
            resetForm(){
              this.$refs.accform.resetFields()
            
            }
        }
    }
</script>

<style lang="less" scoped>
   .account-pwd{
       .el-form-item{
           width: 30%;
           /deep/.el-form-item__label{
               color: #fff;
           }
       }
       .el-select{
           width: 100%;
       }
       
   }
</style>