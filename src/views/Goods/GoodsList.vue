<template>
  <div class="goods-list">
    <Card>
      <!-- 头部 -->
      <div slot="title">商品列表</div>

      <!-- 身体 -->
      <div slot="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品id：">
                  <span>{{ props.row.id }}</span>
                </el-form-item>

                <el-form-item label="商品名称：">
                  <span>{{ props.row.name }}</span>
                </el-form-item>

                <el-form-item label="所属分类：">
                  <span>{{ props.row.category }}</span>
                </el-form-item>

                <el-form-item label="商品价格：">
                  <span>{{ props.row.price }}</span>
                </el-form-item>

                <el-form-item label="商品评价：">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>

                <el-form-item label="商品销量：">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>

                <el-form-item label="商品图片：">
                    <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/' + props.row.imgUrl" />
                </el-form-item>

                <el-form-item label="创建时间：">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>

                <el-form-item label="商品描述：">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>

            <!-- 一级显示 -->
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img :src="imgsrc + scope.row.imgUrl" alt />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button size="mini" @click="bianji(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 9, 15,20,30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 模态框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <!-- 修改内容 -->
          <el-form ref="goodsedit" v-model="goodsedit" label-width="80px">
            <!-- 商品名称 -->
            <el-form-item label="活动名称">
              <el-input v-model="goodsedit.name"></el-input>
            </el-form-item>
            <!-- 商品分类 -->
            <el-form-item label="商品分类">
              <el-input v-model="goodsedit.category"></el-input>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item label="商品价格">
              <el-input v-model="goodsedit.price"></el-input>
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
                <img v-if="goodsedit.imgUrl" :src="imgsrc+goodsedit.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 商品描述 -->
            <el-form-item label="商品描述">
              <el-input v-model="goodsedit.goodsDesc"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import { goodslist, goodsdel, goodsedit } from "../../api/goods";
export default {
  components: {
    Card
  },
  data() {
    return {
      // 模态框显示隐藏
      dialogVisible: false,
      imgsrc: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      // 表单数据
      tableData: [],
      // 修改商品
      goodsedit: [],
      // 显示条数
      pageSize: 3,
      // 当前页码
      currentPage: 1,
      //  总页码
      total: 1
    };
  },
  created() {
    console.log(111);
    this.getgoodslist();
  },
  methods: {
    // 封装一个渲染列表函数
    async getgoodslist() {
      let { total, data } = await goodslist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      this.tableData = data;
      this.tableData.forEach(itme => {
        console.log(itme.imgUrl);
        this.tableData.imgUrl = itme.imgUrl;
      });

      console.log(this.tableData.imgUrl);

      this.total = total;
    },

    // 修改商品
    bianji(row) {
      this.dialogVisible = true;
      this.goodsedit = { ...row };
    },
    // 确定修改商品
    async determine() {
      let { code, msg } = await goodsedit({
        id: this.goodsedit.id,
        name: this.goodsedit.name,
        category: this.goodsedit.category,
        price: this.goodsedit.price,
        imgUrl: this.goodsedit.imgUrl,
        goodsDesc: this.goodsedit.goodsDesc
      });
      if(code === 0 ){
        this.$message({
          type:'success',
          message:msg
        })
        this.dialogVisible = false;
        this.getgoodslist()
      }else{
        this.$message.error(msg)
      }
    },
    // 删除功能
    async del(row) {
      let { code, msg } = await goodsdel({ id: row.id });
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg
        });
        this.getgoodslist();
      } else {
        this.$message.console.error(msg);
      }
    },

    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoodslist();
    },
    // 当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodslist();
      console.log(`当前页: ${val}`);
    },
    // 图片上传成功
    handleAvatarSuccess(res) {
      console.log(res);
      let {  code , imgUrl , msg} = res;
      if(code === 0){
        this.$message({
          type:"success",
          message:msg
        })

        this.goodsedit.imgUrl = imgUrl;
        this.getgoodslist()
      }else{
        this.$message.error(msg)
      }
    },
    // 图片上传前
    beforeAvatarUpload() {}
  }
};
</script>

<style lang="less" scoped>
.el-form-item {
  width: 400px;
}
  /deep/img {
    width: 100px;
    height: 100px;
  }
.block {
  width: 100%;
}
.el-pagination {
  background: #fff;
  padding: 30px 20px;
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
  width: 150px;
  height: 150px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>