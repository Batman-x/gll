<template>
  <div class="account-list">
    <Card>
      <!-- 头部 -->
      <div slot="title">账号列表</div>

      <!-- 主体内容 -->
      <div slot="content" class="content">
        <el-table
          ref="tableData"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 选中框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 账号 -->
          <el-table-column prop="account" label="账号" width="160"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="userGroup" label="用户组" width="160"></el-table-column>

          <!-- 创建时间 -->
          <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="bianji(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          class="fengye"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 3, 5, 10,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 模態框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
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

            <!-- 用户组 -->
            <el-form-item label="用户组" prop="userGroup" class="acc-reg">
              <el-select v-model="accform.userGroup" placeholder="请输入用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
          </span>
        </el-dialog>

        <div style="margin-top: 20px">
          <el-button type="danger" @click="Bulkdelete">批量删除</el-button>
          <el-button type="primary" @click="cancel">取消选择</el-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../../components/Card/Card.vue";
import { acclist, del, alldel , edit} from "../../api/account";
import moment from 'moment'
export default {
  components: {
    Card
  },
  data() {
    return {
      // 列表数据
      tableData: [],
      // 总条数
      total: 0,

      //  当前页
      currentPage: 1,

      // 每页显示条数
      pageSize: 2,

      // 模太框
      dialogVisible: false,

      // 表單數據
      accform: {
        account: "",
        userGroup: ""
      },
      // 驗證規則
      rules: {
        name: {},
        account: {}
      }
    };
  },
  created() {
    this.Sxlist();
  },
  methods: {
    // 封装一个刷新列表函数
    async Sxlist() {
      let { total, data, batchdel } = await acclist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
        
      // 判断边界  当一页删除完后返回第一页
      if(!data.length && this.currentPage !==1){
         this.currentPage -= 1;
        this.Sxlist()
      }
      


      data.forEach(v =>{
        v.ctime = moment(v.ctime).format('YYYY-MM-DD HH:mm:ss')
      })

      this.tableData = data;
      this.total = total;
    },

    // 数据改变是触发
    handleSelectionChange(rows) {
      this.ids = rows.map(row => row.id);
    },

    // 编辑
    bianji(row) {
      console.log(row);
      // 数据回填
      this.accform = { ...row };

      this.dialogVisible = this.dialogVisible ? false : true;
    },
    // 单个删除
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await del({ id: row.id });
          if (code === 0) {
            this.$message({
              type: "success",
              message: msg
            });

            this.Sxlist();
          } else {
            this.$message.error(msg);
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 分页
    handleSizeChange(val) {
      {
        console.log(val);
        this.pageSize = val;
        this.Sxlist();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Sxlist();
    },

    // 批量删除
    Bulkdelete() {
      if(!this.ids){
        this.$message.error('请选择以后再操作哦')
        return
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (!this.ids || !this.ids.length) {
            this.$message.error("请选择以后再操作");
          } else {
            let { code, msg } = await alldel({ ids: JSON.stringify(this.ids) });
            if (code === 0) {
              this.$message({
                type: "success",
                message: msg
              });
              this.Sxlist();
            } else {
              this.$message.error(msg);
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 取消选择
    cancel() {
      this.$refs.tableData.clearSelection();
    },

    // 编辑修改账号
    async determine(){
      console.log(this.accform.id);
       let { code , msg } = await edit({id:this.accform.id,account:this.accform.account,userGroup:this.accform.userGroup})
       if(code === 0){
          this.$message({
            type:'success',
            message:msg
          })
          this.Sxlist()
       }else{
         this.$message.error(msg)
       }
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.fengye {
  background: #fff;
  padding: 20px 20px;
}
/deep/.el-form-item__content {
  width: 220px;
}
</style>