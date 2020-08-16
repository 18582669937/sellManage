<template>
  <div class="content">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderState" placeholder="订单状态">
          <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <div class="block">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchBtn">查询</el-button>
        <el-button type="success" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="260"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="260"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="editClick(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 模态框查看详情 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" disabled>
        <el-form-item label="订单号">
          <el-input v-model="form.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-input v-model="form.orderTime"></el-input>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderList, search } from "@/api/apis";
import { getChinatime } from "@/utils/date.js";
import Pane from "@/components/Pane";
export default {
  components: {
    Pane,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      formInline: {},
      tableData: [],
      dialogVisible: false,
      form: {},
      option: ["已完成", "派送中", "已受理", "全部"],
      // orderNo, consignee, phone, orderState
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    //查询
    searchBtn() {
      //额外参数对象
      let { orderNo, consignee, phone, orderState } = this.formInline;
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.formInline.date)
        paramsex.date = JSON.stringify(this.formInline.date);

      this.paramsex = paramsex;
      console.log(this.paramsex);
      this.fetchData(this.paramsex);

      // search({ currentPage: this.currentPage, pageSize: this.pageSize }).then(
      //   (res) => {
      //     res.data.data.forEach((v) => {
      //       v.orderTime = this.dayjs(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
      //       v.deliveryTime = this.dayjs(v.orderTime).format(
      //         "YYYY-MM-DD HH:mm:ss"
      //       );
      //     });
      //     this.tableData = res.data.data;
      //     this.total = res.data.total;
      //   }
      // );
    },

    fetchData(paramsex) {
      orderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        res.data.data.forEach((v) => {
          v.orderTime = this.dayjs(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
          v.deliveryTime = this.dayjs(v.orderTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(this.paramsex);
    },

    //重置
    reset() {
      //清空表单
      this.formInline = {};
      this.paramsex = {};
      this.fetchData();
    },
    //查看
    handleClick(row) {
      this.dialogVisible = true;
      this.form = { ...row };
    },
    //编辑
    editClick(id) {
      this.$router.push("/order/order-edit");
      console.log(id);
      localStorage.setItem("list", id);
      // console.log(localStorage.id);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  height: 100%;
  .el-table {
    margin-top: 30px;
  }
}
</style>