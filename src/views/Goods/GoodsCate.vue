<template>
  <div class="goods-cate">
    <Card>
      <!-- 头部 -->
      <div slot="title" class="title">
        <div>商品分类</div>

        <el-button @click="addaddcate" type="primary" size="small">添加分类</el-button>
      </div>

      <!-- 内容 -->
      <div slot="content">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="序号" width="100">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>

          <el-table-column label="分类名称" width="300">
            <template slot-scope="scope">
              <span v-if="!scope.row.isandno">{{scope.row.cateName}}</span>

              <el-input v-else size="mini" v-model="scope.row.cateName"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="state" label="是否启用" width="300">
            <template slot-scope="scope">
              <el-switch
                :disabled="!scope.row.isandno"
                v-model="scope.row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.isandno" size="mini" @click.stop="bianji(scope.row)">编辑</el-button>

              <el-button @click.stop="tobianji" v-else size="mini">完成</el-button>

              <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 模态框 -->
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
          <el-form>
            <el-form-item label="商品分类" label-width="80px">
              <el-input v-model="moDate.cateName"></el-input>
            </el-form-item>


            <el-form-item label="是否启用" label-width="80px">
               <el-switch v-model="moDate.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="setaddcate">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import { catelist, editcate, delcate,addcate } from "../../api/goods";
export default {
  components: {
    Card
  },
  data() {
    return {
      // 总条数
      total: 13,
      // 显示条数
      pageSize: 5,
      // 当前页
      currentPage: 1,
      // 列表数据
      tableData: [],
      // 模态框数据
      moDate: {
        cateName: "",
        state:false
      },
      row:{},
      // 模态框显示隐藏
      dialogVisible: false
    };
  },

  methods: {
    // 渲染分类列表
    async getcategories() {
      let { data, total } = await catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      data.forEach(item => {
        item.state = item.state === 1 ? true : false;
        item.isandno = false;
      });
      this.total = total;
      this.tableData = data;
    },

    // 当前页触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcategories();
    },
    // 每页条数改变是触发
    handleSizeChange(val) {},

    // 编辑
    bianji(row) {
      row.isandno = !row.isandno;
      this.row = row;
    },
    // 修改完成
    async tobianji() {
      let { code, msg } = await editcate({
        id: this.row.id,
        cateName: this.row.cateName,
        state: this.row.state
      });
      if (code === 0) {
       this.$message({
         type:'success',
         message:msg
       })
        this.getcategories();
      }else{
        this.$message.error(msg)
      }
    },
    // 删除
    async del(row) {
      let { code, msg } = await delcate({
        id: row.id
      });

      if (code === 0) {
           this.$message({
         type:'success',
         message:msg
       })
        this.getcategories();
      }else{
        this.$message.error(msg)
      
      }
    },
    // 添加分类
    addaddcate() {
      this.dialogVisible = true;
    },
    // 确定添加发送请求
     async setaddcate(){
       let { code ,msg } = await addcate({
          cateName:this.moDate.cateName,
          state:this.moDate.state
        })
        if(code === 0){
          this.$message({
            type:'success',
            message:msg
          })
          this.getcategories()

          this.dialogVisible = false
        }else{
          this.$message.console.error(msg);
          
        }
    }
  },
  created() {
    this.getcategories();
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-pagination {
  background: #fff;
  padding: 20px 10px;
}
</style>