<template>
    <div class="account-add">
    <Card>
        <!-- 头部插入 -->
        <span slot='title'>添加账号</span>


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
      <!-- 用户名： -->
      <el-form-item prop="account" label="账号">
        <el-input
          prefix-icon="iconfont icon-zhanghao"
          type="text"
          v-model="accform.account"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码： -->
      <el-form-item prop="password" label="密码">
        <el-input
          prefix-icon="iconfont icon-suo"
          type='text'
          v-model="accform.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>


    <!-- 用户组 -->
      <el-form-item label="用户组" prop="userGroup" class="acc-reg">
    <el-select v-model="accform.userGroup" placeholder="请输入用户组">
      <el-option label="超级管理员" value="超级管理员"></el-option>
      <el-option label="普通管理员" value="普通管理员"></el-option>
    </el-select>
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
import { ACC_LOGIN ,ACC_PWD } from '../../utils/reg'
import { addpwd } from '../../api/account'

    export default {
        components:{
            Card
        },
        data(){
          let account = (rule,value,callback) =>{
                if(!value){
                  callback(new Error('请输入账号'))
                }else if(!ACC_LOGIN.test(value)){
                  callback(new Error('中文、英文、数字、下划线、1-16个字符'))
                }else{
                  callback()
                }
                
          }
          let password = (rules , value ,callback)=>{
              if(!value){
                callback(new Error('请输入密码'))
              }else if(!ACC_PWD.test(value)){
                callback(new Error('中文、英文、数字、下划线、4-16个字符'))
              }else{
                callback()
              }
          }
            return{
                accform:{
                    account:'',
                    password:'',
                    userGroup:''
                },
                rules:{
                    account:{ validator: account, trigger: 'blur' },
                    password:{ validator: password, trigger: 'blur' },
                    userGroup:{trigger: 'change' ,required:true ,message:'请输入用户组'}
                }
            }
        },
        methods:{
          // 确认添加
            submitForm(){
                this.$refs.accform.validate( async data=>{
                  if(data){
                    let { code , msg } = await addpwd(this.accform)
                    if(code === 0){
                        this.$message({
                          type:"success",
                          message:msg
                        })

                        this.$router.push('/account/account-list')
                    }else{
                      this.$message.error(msg)
                    }
                  }
                })
                
                

            },

            // 重置
            resetForm(){
              this.$refs.accform.resetFields()
            }
        }
    }
</script>

<style lang="less" scoped>
   .account-add{
       .el-form{
         width: 400px;
         .el-form-item{
           /deep/.el-form-item__label{
               color: #fff;
           }
       }
       .el-select{
           width: 100%;
       }
       }
       
   }
</style>