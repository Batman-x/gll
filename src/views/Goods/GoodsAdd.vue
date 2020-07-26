<template>
  <div class="goods-add">
    <Card>
      <div slot="title">商品添加</div>

      <div slot="content">
        <el-form ref="goodsadd" :model="goodsadd" label-width="80px">
          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="goodsadd.name"></el-input>
          </el-form-item>

          <!-- 商品分类-->
          <el-form-item label="商品分类">
            <el-select v-model="goodsadd.category" placeholder="请选择分类">
              <el-option v-for="(item,index) in getfl" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品价格-->
          <el-form-item label="商品价格">
            <el-input-number
              v-model="goodsadd.price"
              @change="handleChange"
              :min="1"
              :max="100000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>

          <!-- 商品图片 -->
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="goodsadd.imgUrl" :src="imgsrc+goodsadd.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="goodsadd.goodsDesc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import { goodsadd ,categories } from '../../api/goods'
export default {
  components: {
    Card
  },
  data() {
    return {
      // 查询分类
      getfl:[],
      imgUrl: "",
      goodsadd:{
        price:1,
        imgUrl:''
      },
      imgsrc:'http://127.0.0.1:5000/upload/imgs/goods_img/'
    };
  },
  created(){
      this.getcategories()
  },
  methods: {
      // 获取分类
     async getcategories(){
          let str = await categories()
          let arr = []
          str.categories.forEach(item=>{
            arr.push(item.cateName)
          })

          this.getfl = arr
      },
    onSubmit() {
       this.$refs.goodsadd.validate(async valid =>{
          let {code , msg} = await goodsadd(this.goodsadd)
        if (code===0){
                this.$message({
                    type:'success',
                    message:msg
                })
                this.$router.push('/goods/goods-list')
              }else{
                this.$message.error(msg)
              }
       })
    },

    handleChange(value) {
      console.log(value);
    },
    //上传成功的函数
    handleAvatarSuccess(res) {
      console.log(res);
      let { code, msg ,imgUrl} = res;
      if(code ===0 ){
        this.goodsadd.imgUrl = imgUrl;
        this.$message({
          type:'success',
          message:msg
        })
      }else{
        this.$message.error(msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.goods-add {
  /deep/ .el-form-item__label {
    color: #fff;
  }
  /deep/.el-form-item__content,
  .el-select {
    width: 300px;
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
</style>