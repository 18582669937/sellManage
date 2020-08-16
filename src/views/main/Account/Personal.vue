<template>
  <Pane>
    <p slot="title">个人中心</p>
    <div slot="content">
      <p>管理员ID：{{user.id}}</p>
      <el-divider></el-divider>
      <p>账号：{{user.account}}</p>
      <el-divider></el-divider>
      <p>用户组：{{user.userGroup}}</p>
      <el-divider></el-divider>
      <p>创建时间：{{user.ctime|filterCtime}}</p>
      <el-divider></el-divider>
      <!-- 管理头像 -->
      <p>
        管理员头像：
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="uploaddata"
        >
          <img v-if="user.imgUrl" :src="user.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="edit">确定</el-button>
      </p>
    </div>
  </Pane>
</template>

<script>
import moment from "moment";
import { personal } from "@/api/apis";
import Pane from "@/components/Pane";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      uploaddata: {},
      user: {},
      imgUrl: "",
      baseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
    };
  },
  methods: {
    fechData() {
      personal(localStorage.id).then((res) => {
        this.user = res.data.accountInfo;
      });
    },
    handleAvatarSuccess(res) {
      this.user.imgUrl = this.baseUrl + res.imgUrl;
      // if (res.code == 0) {
      // this.$bus.$emit("sendHead");
      // }
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
    edit() {
      this.fechData();
      this.$bus.$emit("sendHead");
    },
  },
  created() {
    this.fechData();
    this.uploaddata = { id: localStorage.id };
  },
  filters: {
    filterCtime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
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