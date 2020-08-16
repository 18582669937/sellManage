<template>
  <Pane>
    <p slot="title">账号列表</p>
    <div slot="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 选择框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 账号 -->
        <el-table-column prop="account" label="账号" width="120"></el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="userGroup" label="用户组" width="140"></el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="ctime" label="创建时间" width="250"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <el-button type="danger" @click="batchDel">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection">取消选择</el-button>
      <!-- 编辑模态框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="form.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Pane>
</template>

<script>
import Pane from "@/components/Pane";
import { accList, accDelet, batDel, editAcc } from "@/api/apis";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      form: {},
    };
  },

  methods: {
    fechData() {
      accList(this.currentPage, this.pageSize).then((res) => {
        this.total = res.data.total;
        //处理时间
        res.data.data.forEach((v) => {
          v.ctime = this.dayjs(v.ctime).format("YYYY-MM-DD HH:mm:ss");
          // v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
        });
        this.tableData = res.data.data;
      });
    },
    //当前页改变调用一次
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fechData();
    },
    //每页条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.fechData();
    },
    /* 删除 */
    handleDelete(id) {
      // console.log(id);
      if (!this.ids) {
        this.$message.error("请选择后再删除");
      } else if (!this.ids.length) {
        this.$message.error("请选择后再删除");
        return;
      }
      this.$confirm("确定要删除此账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          accDelet(id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fechData();
            } else {
              this.$message.error("删除失败!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(rows) {
      this.ids = rows.map((v) => v.id); //id直接挂在在this上
      console.log(this.ids);
    },
    /* 批量删除 */
    batchDel() {
      if (!this.ids) {
        this.$message.error("请选择后再删除");
        return;
      } else if (!this.ids.length) {
        this.$message.error("请选择后再删除");
        return;
      }
      this.$confirm("你要删除吗？ 很危险的哦~~?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送批量删除请求
          batDel(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code === 0) {
              this.fechData(); // 刷新
            }
          });
          // let { code } = await batchDelAccount({
          //   ids: JSON.stringify(this.ids),
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 编辑 */
    handleEdit(row) {
      this.dialogVisible = true;
      this.form = { ...row };
      // console.log(this.form);
      // console.log("row", row);
    },
    /* 保存编辑 */
    saveEdit() {
      editAcc(this.form).then((res) => {
        // console.log(this.form);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.dialogVisible = false;
          this.fechData();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    /* 模态框 */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.fechData();
  },
};
</script>

<style lang="less" scoped>
.block {
  margin-top: 20px;
  margin-bottom: 20px;
}
/deep/.el-form-item__content {
  width: 230px;
}
</style>