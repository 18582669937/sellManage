<template>
  <Pane>
    <p slot="title" class="title">商品增加</p>
    <div slot="content">
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
            <img v-if="form.imageUrl" :src="baseUrl+form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <el-input type="textarea" v-model="form.goodsDesc"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addBtn">添加</el-button>
      </el-form>
    </div>
  </Pane>
</template>

<script>
import { addGoods, categories, uploadGoods } from "@/api/apis";
import Pane from "@/components/Pane";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      form: {
        name: "",
        category: "",
        price: "0",
        imageUrl: "",
        goodsDesc: "",
      },

      categoriesarr: [],
      baseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
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
    /* 添加商品 */
    addBtn() {
      // this.form.price = this.form.price.toString();
      // console.log(this.form.price);
      // console.log(this.form);
      addGoods({
        name: this.form.name,
        category: this.form.category,
        price: this.form.price,
        imgUrl: this.form.imageUrl,
        goodsDesc: this.form.goodsDesc,
      }).then((res) => {
        // console.log(res.data);
        if (res.data.code == 0) {
          this.$router.push("/goods/goods-list");
        }
      });
    },
    handleChange(value) {
      this.form.price = this.form.price.toString();
      console.log(this.form);
    },
  },
  created() {
    categories().then((res) => {
      this.categoriesarr = res.data.categories;
    });
  },
};
</script>

<style lang="less" scoped>
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