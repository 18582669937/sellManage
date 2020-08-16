<template>
  <Pane>
    <p slot="title">修改密码</p>
    <div slot="content">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="form.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="form.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="form.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="editBtn">确认</el-button>
        <el-button @click="resetBtn">重置</el-button>
      </el-form>
    </div>
  </Pane>
</template>

<script>
import { oldPwd, editPwd } from "@/api/apis";
import Pane from "@/components/Pane";
export default {
  components: {
    Pane,
  },
  data() {
    //自定义验证旧密码
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
        return;
      } else {
        //发送ajax验证旧密码是否正确
        oldPwd(this.form.oldPwd, this.id).then((res) => {
          if (res.data.code == "0") {
            callback();
          } else {
            callback(new Error("原密码错误"));
          }
        });
      }
    };
    //自定义验证新密码
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (oldPwd == newPwd) {
        callback(new Error("两次密码一致"));
      } else {
        this.$refs.form.validateField("newPwd");
        callback();
      }
    };

    //自定义验证确认密码
    var validatePass3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        oldPwd: "",
        newPwd: "",
        checkPwd: "",
      },
      id: localStorage.id,
      rules: {
        oldPwd: { validator: validatePass, trigger: "blur" },
        newPwd: { validator: validatePass2, trigger: "blur" },
        checkPwd: { validator: validatePass3, trigger: "blur" },
      },
    };
  },
  methods: {
    editBtn() {
      editPwd(this.form.newPwd, this.id).then((res) => {
        console.log(this.form.newPwd);
        console.log(this.id);
        console.log(res.data.code);
        return;
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功！",
            type: "success",
          });
          localStorage.clear();
          this.$router.push("/");
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    resetBtn() {
      this.form = {};
    },
  },
  // created() {
  //   let id = localStorage.id;
  //   console.log(id);
  // },
};
</script>

<style lang="less" scoped>
.el-form {
  width: 400px;
}
</style>