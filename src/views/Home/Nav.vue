<template>
  <div class="nav">
    <el-col>
      <el-menu
        :default-active="curHash"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <h1>
          <span class="headerImg iconfont icon-meishi"></span>外卖商家中心
        </h1>
        <div v-for="item in powerarr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <!-- 商品列表 添加商品 商品分类 -->
          <el-submenu v-else :index="item.url">
            <!-- 大标题的名字 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>

            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import { checktoken } from "@/api/apis";
export default {
  data() {
    return {
      list: [
        {
          url: "/homecontent",
          icon: "iconfont icon-shouye7",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/order/order-list",
          icon: "iconfont icon-icon-contract",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/goods/goods-list",
          icon: "iconfont icon-icon-contract",
          name: "商品管理",
          children: [
            { url: "/goods/goods-list", name: "商品列表" },
            { url: "/goods/goods-add", name: "商品添加" },
            { url: "/goods/goods-classify", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/store",
          icon: "iconfont icon-dianpu",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/account/account-list",
          icon: "iconfont icon-zhanghao",
          name: "账号管理",
          children: [
            { url: "/account/account-list", name: "账号列表" },
            { url: "/account/account-add", name: "添加账号" },
            { url: "/account/alter-pwd", name: "修改密码" },
            { url: "/account/Personal", name: "个人中心" },
          ],
          roles: ["super"],
        },
        {
          url: "/sell/shop-stat",
          icon: "iconfont icon-tongji",
          name: "销售统计",
          children: [
            { url: "/sell/shop-stat", name: "商品统计" },
            { url: "/sell/order-stat", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      curHash: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.acc;
      } else {
        //无效
        this.username = "请登录";
      }
    });
    this.curHash = this.$route.path;
  },
  computed: {
    //权限数组
    powerarr() {
      // 根据用户权限进行运算，返回运算完毕的数组
      let newarr = this.list.filter((item) => {
        //返回包含此用户权限的数据
        return item.roles.includes(localStorage.roles);
        // console.log(item.roles);
      });
      return newarr;
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  width: 250px;
  h1 {
    color: #fff;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    span {
      font-size: 24px;
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #1296db;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .el-col {
    height: 100%;
    .el-menu {
      height: 100%;
    }
    .el-menu-item {
      font-size: 18px;
    }
    .el-submenu__title {
      span {
        font-size: 18px;
      }
    }
    span {
      a {
        color: #fff;
        font-size: 18px;
        text-decoration: none;
      }
    }
  }
  i {
    margin-right: 20px;
    font-size: 18px;
  }
  a {
    text-decoration: none;
  }
}
</style>