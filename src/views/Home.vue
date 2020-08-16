<template>
  <div class="home">
    <div class="left">
      <!-- 左边导航 -->
      <Nav />
    </div>
    <div class="right">
      <!-- 头部 -->
      <Header />
      <Main />
    </div>
  </div>
</template>

<script>
import Nav from "@/views/Home/Nav";
import Header from "@/views/Home/Header";
import Main from "@/views/Home/Main";
export default {
  components: {
    Nav,
    Header,
    Main,
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100%;
  // .left {
  //   width: 300px;
  // }
  .right {
    flex: 1;
    background-color: #f0f2f5;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>