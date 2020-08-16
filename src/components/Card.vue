<template>
  <el-card class="box-card">
    <div class="left">
      <i :class="item.icon" :style="{color:item.color}"></i>
    </div>
    <div class="right">
      <p class="title">{{item.title}}</p>
      <p class="count">{{item.count}}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    item: {},
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
// .el-card {
//   width: 320px;
// }
/deep/.el-card__body {
  // width: 300px;
  // height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 0 0 100px;
    /deep/i {
      font-size: 90px;
    }
  }
  .right {
    flex: 1;
    text-align: center;
    .title {
      font-size: 20px;
      color: #ccc;
      font-weight: bold;
    }
    .count {
      margin-top: 5px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>