<template>
  <div class="login">
    <div class="login-box">
      <h1>外卖管理系统</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="account">
          <el-input placeholder="请输入内容" v-model="loginForm.account" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <p>{{error}}</p>
      <button @click="LoginBtn">登录</button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis.js";
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      rules: {
        // 内置验证
        account: { required: true, message: "请输入账号", trigger: "blur" },
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      error: "",
    };
  },
  methods: {
    LoginBtn() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.account);
          login(this.loginForm).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
              localStorage.token = res.data.token; //把token存到本地
              localStorage.acc = this.loginForm.account; //把用户名存到本地
              localStorage.id = res.data.id; //存id
              localStorage.roles = res.data.role;
              this.$router.push("/homecontent");
              this.$message({
                message: "用户登录成功",
                type: "success",
              });
            } else this.error = res.data.msg;
          });
        } else {
          console.log("验证不通过，不可以提交");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/imgs/food1.jpg");
  background-size: 100% 100%;
  color: #fff;
  .login-box {
    width: 400px;
    height: 300px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    line-height: 60px;
    h1 {
      font-size: 26px;
      text-align: center;
      font-weight: bold;
      color: #fff;
    }
    /deep/input {
      border: 1px solid #fff;
      width: 395px;
      height: 40px;
      background-color: transparent;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
    }
    p {
      font-weight: bold;
      color: red;
    }
    button {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      background-color: #409eff;
      border: 1px solid #409eff;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>