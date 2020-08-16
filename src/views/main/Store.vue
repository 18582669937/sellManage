<template>
  <Pane>
    <p slot="title" class="title">
      <span>店铺管理</span>
      <el-button :type="isedit?'success':'primary'" @click="btn">{{isedit?'保存':'编辑'}}</el-button>
    </p>
    <div slot="content" class="content">
      <el-form :model="form" label-width="80px" :disabled="!isedit">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="form.bulletin"></el-input>
        </el-form-item>
        <!-- 店铺头像 -->
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="SHOP_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.avatar"
              :src="form.avatar==''?'':UPLOAD_SHOP+form.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 店铺图片 -->

        <el-form-item label="店铺图片">
          <el-upload
            :action="SHOP_UPLOAD"
            :file-list="form.pics"
            list-type="picture-card"
            :on-success="handleImgSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- 配送费 -->
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryPrice"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <!-- 配送描述 -->
        <el-form-item label="配送描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 销量 -->
        <el-form-item label="销量">
          <el-input v-model="form.sellCount"></el-input>
        </el-form-item>
        <!-- 店铺评分 -->
        <el-form-item label="店铺评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <!--活动性质  -->
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 营业时间 -->
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </Pane>
</template>

<script>
import { shopDetail, editContent, SHOP_UPLOAD, UPLOAD_SHOP } from "@/api/apis";
import Pane from "@/components/Pane";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      date: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      form: {},
      // baseUrl: "",
      isedit: false,
      dialogImageUrl: "",
      SHOP_UPLOAD: "",
      UPLOAD_SHOP: "",
    };
  },
  methods: {
    /* 头像 */
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.$message({ type: "success", message: "头像上传成功" });
        console.log(res);
        this.form.avatar = res.imgUrl; //回填图片
      }
      // console.log(res);
    },
    /* 店铺图片 */
    handleImgSuccess(res) {
      if (res.code == 0) {
        console.log(res);
        // this.$message({ type: "success", message: "店铺图片上传成功" });
        this.form.pics.push({ url: this.UPLOAD_SHOP + res.imgUrl });
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
    },
    /* 店铺图片 */
    handleRemove(file, fileList) {
      console.log(file);
      this.form.pics.splice(this.form.pics.indexOf(file), 1); //数组中删除指定元素的索引
      console.log(this.form.pics);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    fechData() {
      shopDetail().then((res) => {
        this.form = res.data.data;
        //头像
        // this.form.avatar = this.baseUrl + res.data.data.avatar;
        //  this.baseUrl + res.data.data.pics;
        //店铺图片
        this.form.pics = res.data.data.pics.map((v) => ({
          url: this.UPLOAD_SHOP + v,
        }));
        this.form.supports = res.data.data.supports;
        this.form.date = res.data.data.date;
        // console.log(this.form.date);
        // console.log(this.form.supports);
      });
    },
    /* 编辑 */
    btn() {
      if (this.isedit) {
        this.isedit = false;
        console.log(this.form);
        let shopForm = JSON.parse(JSON.stringify(this.form));

        shopForm.date.forEach((v) => {
          v = this.dayjs(v).format("YYYY-MM-DD HH:mm:ss");
        });
        shopForm.date = JSON.stringify(shopForm.date);
        shopForm.supports = JSON.stringify(shopForm.supports);
        shopForm.pics = JSON.stringify(
          shopForm.pics.map((v) => v.url.substr(this.UPLOAD_SHOP.length))
        );
        console.log(shopForm);
        // editContent(shopForm).then((res) => {
        //   this.fechData();
        // });
      } else {
        this.isedit = true;
      }
    },
  },
  created() {
    this.fechData();
    this.SHOP_UPLOAD = SHOP_UPLOAD;
    this.UPLOAD_SHOP = UPLOAD_SHOP;
  },
};
</script>

<style lang="less" scoped>
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
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.title {
  position: relative;
  .el-button {
    position: absolute;
    right: 10px;
    top: 5px;
  }
}
.content {
  width: 500px;
}
</style>