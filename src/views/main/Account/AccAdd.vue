<template>
  <Pane>
    <p slot="title">添加账号</p>
    <div slot="content">
      <el-form :model="form" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="form.userGroup" placeholder="用户组">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="addBtn">添加</el-button>
        <el-button>取消</el-button>
      </el-form>
    </div>
  </Pane>
</template>

<script>
import Pane from "@/components/Pane";
import { accAdd } from "@/api/apis";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      form: {
        account: "",
        password: "",
        userGroup: "",
      },
    };
  },
  methods: {
    addBtn() {
      accAdd(this.form).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          // this.$message({
          //   message: "添加成功",
          //   type: "success",
          // });
          this.$router.push("/account/account-list");
          this.form = {};
        } else {
          this.$message.error("添加失败");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 15px 15px 30px 15px;
  box-sizing: border-box;
  p {
    height: 40px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .el-form {
    width: 400px;
  }
}
</style>