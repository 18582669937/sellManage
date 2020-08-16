<template>
  <div class="header">
    <p class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <p class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{acc}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="layout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :src="imgUrl"></el-avatar>
    </p>
  </div>
</template>

<script>
import { personal } from "@/api/apis";
export default {
  data() {
    return {
      imgUrl: "",
      acc: "",
      id: localStorage.id,
      breadlist: [],
    };
  },
  methods: {
    fetchData() {
      this.acc = localStorage.acc;
      personal(this.id).then((res) => {
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },
    handleCommand(cmd) {
      if (cmd == "personal") {
        this.$router.push("/account/Personal");
      } else {
        this.$message({ message: "你已推出登录", type: "success" });
        localStorage.clear();
        this.$router.push("/");
      }
    },
  },
  //可以观察vue很多属性的变化  这里侦听hash的变化
  //to:要切换到哪里
  watch: {
    $route(to) {
      this.breadlist = to.meta.breadlist;
    },
  },
  created() {
    //初始化给二级导航赋值
    // console.log(this.$route);是一个对象，对象里面有meta属性
    this.breadlist = this.$route.meta.breadlist;
    this.fetchData();
    this.$bus.$on("sendHead", () => {
      this.fetchData();
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 70px;
  width: 100%;
  background-color: #fff;
  display: flex;
  padding: 0 15px;
  box-sizing: border-box;
  line-height: 70px;
  font-size: 20px;
  .left {
    flex: 1;
    .el-breadcrumb {
      line-height: 70px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 8px;
    }
  }
}
</style>