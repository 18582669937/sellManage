<template>
  <div class="content">
    <Pane>
      <p slot="title" class="title">
        <span>商品分类</span>
        <el-button type="primary" @click="add">添加分类</el-button>
      </p>
      <div slot="content">
        <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column type="index" width="100" label="序号"></el-table-column>
          <el-table-column prop="cateName" label="分类名称" width="360">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.cateName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="是否启用" width="300" dis>
            <template slot-scope="scope">
              <el-switch
                :disabled="!scope.row.isedit"
                v-model="scope.row.state"
                active-color="#13ce66"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
                :type="scope.row.isedit?'success':'primary'"
              >{{scope.row.isedit?'完成':'编辑'}}</el-button>
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
      </div>
    </Pane>
    <!-- 弹出模态框 -->
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="form" label-width="80px">
        <el-form-item label="添加分类">
          <el-input v-model="form.cateName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClassify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCate, addCate, delCate, editCate } from "@/api/apis";
import Pane from "@/components/Pane";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      state: false,
      tableData: [],
      currentRow: null,
      dialogVisible: false,
      form: {},
    };
  },
  methods: {
    fechData() {
      getCate(this.currentPage, this.pageSize).then((res) => {
        // console.log(res.data.data.state);
        // console.log(res.data.total);
        //处理数据
        res.data.data.forEach((v) => {
          v.state = v.state == 1 ? true : false;
          v.isedit = false;
        });

        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    add() {
      this.dialogVisible = true;
    },
    /* 模态框 */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //添加分类
    addClassify() {
      addCate(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogVisible = false;
          this.fechData();
        } else {
          this.$message.error("添加失败！");
        }
      });
    },

    handleEdit(row) {
      if (row.isedit) {
        row.isedit = false;
        editCate(row.id, row.cateName, row.state).then((res) => {
          // console.log(res.data);
          if (res.data.code == 0) {
            this.$message({ message: "修改成功！", type: "success" });
          } else {
            this.$message.error("修改失败");
          }
        });
      } else {
        row.isedit = true;
      }
    },
    //删除分类
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCate(id).then((res) => {
            if (res.data.code == 0) this.fechData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fechData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fechData();
    },
  },
  created() {
    this.fechData();
  },
};
</script>

<style lang="less" scoped>
// .content {
//   background-color: #fff;
//   padding: 15px;
//   box-sizing: border-box;
//   p {
//     height: 40px;
//     line-height: 30px;
//     border-bottom: 1px solid #ccc;
//     margin-bottom: 20px;
//   }

// }
.block {
  margin-top: 20px;
}
/deep/.title {
  // display: flex;
  // align-items: center;
  position: relative;
  .el-button {
    position: absolute;
    right: 20px;
    top: 5px;
  }
}
</style>