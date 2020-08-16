<template>
  <div class="content">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="form.orderNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-input v-model="form.orderTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="form.consignee"></el-input>
      </el-form-item>
      <el-form-item label="送货地址">
        <el-input v-model="form.deliverAddress"></el-input>
      </el-form-item>
      <el-form-item label="送达时间">
        <el-input v-model="form.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item label="订单金额">
        <el-input v-model="form.orderAmount"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model="form.orderState"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="$router.push('/order/order-list')">返回</el-button>
    <el-button type="primary" @click="saveBtn">确认</el-button>
  </div>
</template>

<script>
import { orderDetail, editOrder } from "@/api/apis";
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    saveBtn() {
      editOrder(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$router.push("/order/order-list");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
  },
  created() {
    console.log(parseInt(localStorage.list));
    orderDetail(localStorage.list).then((res) => {
      console.log(res.data.data);
      res.data.data.deliveryTime = this.dayjs(
        res.data.data.deliveryTime
      ).format("YYYY-MM-DD HH:mm:ss");
      res.data.data.orderTime = this.dayjs(res.data.data.orderTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      this.form = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  .el-form {
    width: 500px;
  }
}
</style>