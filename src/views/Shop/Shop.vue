<template>
  <div class="shop">
    <Card>
      <div class="title" slot="title">
        <div>店铺管理</div>
        <el-button size="small" type="primary" @click="sendshop">保存</el-button>
      </div>

      <!-- 主体内容 -->
      <div slot="content" class="content">
        <el-form ref="form" :model="shopform" label-width="80px">
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="shopform.name"></el-input>
          </el-form-item>

          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input :rows='5' type="textarea" v-model="shopform.bulletin"></el-input>
          </el-form-item>

          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopform.avatar" :src="shopform.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 店铺图片 -->
          <el-form-item label="店铺图片">
            <el-upload
              :file-list="filelist"
              action="http://127.0.0.1:5000/shop/upload/"
              list-type="picture-card"
              :on-success="onsuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="shopform.pics" alt/>
            </el-dialog>
          </el-form-item>

          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input v-model="shopform.deliveryPrice"></el-input>
          </el-form-item>
          <!-- 配送时间 -->
          <el-form-item label="配送时间">
            <el-input v-model="shopform.deliveryTime"></el-input>
          </el-form-item>
          <!-- 配送描述 -->
          <el-form-item label="配送描述">
            <el-input v-model="shopform.description"></el-input>
          </el-form-item>
          <!-- 店铺评分 -->
          <el-form-item label="店铺评分">
            <el-input v-model="shopform.score"></el-input>
          </el-form-item>
          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input v-model="shopform.sellCount"></el-input>
          </el-form-item>

           <!-- 起送价格 -->
          <el-form-item label="起送价格">
            <el-input v-model="shopform.minPrice"></el-input>
          </el-form-item>

          <el-form-item label="活动">
            <el-checkbox-group v-model="shopform.supports">
              <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
              <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
              <el-checkbox label="全场7折起" name="type"></el-checkbox>
              <el-checkbox label="充值200送50" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 配送时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              v-model="shopform.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import {info ,shopedit} from '../../api/order'
export default {
  components: {
    Card
  },
  data() {
    return {
      // 双向绑定表单数据
      shopform: {
        name: "",
        avatar:"",
        bulletin: "",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports:[],
        pics:[],
        minPrice:"",
        date:[],
      },
      // 店铺头像
      imgsrc:'http://127.0.0.1:5000/upload/shop/',
      // 店铺列表
       filelist:[],
      dialogVisible: false,
    };
  },
  created() {
    this.getinfo()
  },
  methods: {
    // 回填数据
    async getinfo(){
      let {data} = await info()
      // console.log(data);
        // this.imgUrl = data.avatar
        let arr = []
      data.pics.forEach(item =>{
         arr.push({
           name:item,
           url:this.imgsrc + item
         })
      })

      this.filelist = arr
      this.shopform = data
      console.log(this.shopform);
      
    },
    // 店铺图片上传成功
    onsuccess(res){
        console.log(res);
        let { code ,msg,imgUrl } = res
        if(code === 0){
            this.$message({
              type:'success',
              message:msg
            })
        }else{
          this.$message.error(msg)
        }
        
    },
    // 保存修改
    async sendshop(){
       let {code,msg} = await shopedit(this.shopform)
       if(code === 0){
          this.$message({
            type:'success',
            message:msg
          })
       }else{
         this.$message.error(msg)
       }
                   
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
        let { code ,msg ,imgUrl} =res;
        if(code === 0){
            this.$message({
              type:'success',
              message:msg
            })
            this.shopform.avatar = this.imgsrc + imgUrl
        }else{
          this.$message.error(msg)
        }
    },
    // 图片上传之前
    beforeAvatarUpload(file) {},
     
    // 店铺图片
    handleRemove(file) {
     console.log(file);
    },
    handlePictureCardPreview(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="less" scoped>
.shop {
  height: 170%;
  padding-bottom: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-form {
    /deep/.el-form-item__label {
      color: #fff;
    }
    .el-form-item {
      width: 500px;
    }
    /deep/.el-checkbox__label {
      color: #fff;
    }
  }
  // 上传头像
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
</style>