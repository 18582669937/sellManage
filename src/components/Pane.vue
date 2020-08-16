<template>
  <el-card class="box-card">
    <div class="title">
      <!-- 预留插槽放父亲写过来的标题 -->
      <slot name="title"></slot>
    </div>
    <div class="content">
      <!-- 预留插槽放父亲写的内容 -->
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/deep/.el-card__body {
  width: 100%;
  padding: 0px;
  .title {
    padding-left: 20px;
    font-size: 20px;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .content {
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>