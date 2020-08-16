<template>
  <Pane>
    <p slot="title">商品列表</p>
    <div slot="content">
      <el-table :data="tableData" style="width: 100%" v-loading="isloading">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img width="40" height="40" :src="baseUrl+props.row.imgUrl" />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img width="50" height="50" :src="baseUrl + scope.row.imgUrl" alt />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
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

      <!-- 编辑模态框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称" label-width="80px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.category" placeholder="商品分类">
              <el-option
                v-for="item in categoriesarr"
                :key="item.cateName"
                :value="item.cateName"
              >{{item.cateName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" label-width="80px">
            <el-input-number
              v-model="form.price"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片" label-width="80px">
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.imgUrl" :src="baseUrl+form.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述" label-width="80px">
            <el-input type="textarea" v-model="form.goodsDesc"></el-input>
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
import { getList, delGoods, editGoods, categories } from "@/api/apis";
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
      tableData: [],
      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      dialogVisible: false,
      form: {},
      categoriesarr: [],
      isloading: false,
    };
  },
  methods: {
    /* 图片 */
    handleAvatarSuccess(res) {
      console.log(res);
      this.form.imageUrl = res.imgUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    fechData() {
      this.isloading = true;
      getList(this.currentPage, this.pageSize).then((res) => {
        res.data.data.forEach((v) => {
          v.ctime = this.dayjs(v.ctime).format("YYYY-MM-DD HH:mm:ss");
        });

        this.tableData = res.data.data;
        this.total = res.data.total;
      });
      this.isloading = false;
    },
    handleEdit(row) {
      this.form = { ...row };
      this.dialogVisible = true;
    },
    /* 删除 */
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGoods(id).then((res) => {
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
    /* 模态框确定编辑 */
    saveEdit() {
      this.dialogVisible = false;
      editGoods(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "修改成功！", type: "success" });
          this.fechData();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },

    handleChange(value) {
      // this.form.price = this.form.price.toString();
      // console.log(this.form);
    },

    handleClose(done) {
      done();
    },
    /* 分页 */
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
    categories().then((res) => {
      this.categoriesarr = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.content {
  background-color: #fff;
  padding: 15px;
  p {
    height: 40px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
  }
  .block {
    margin-top: 30px;
  }
}

.el-input,
.el-textarea {
  width: 400px;
}

/deep/.el-upload {
  border: 1px dashed #ccc;
  margin-top: 20px;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
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
</style>