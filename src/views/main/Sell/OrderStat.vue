<template>
  <div>
    <el-form>
      <el-form-item label="时间范围" label-width="80px">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-date-picker>
        <el-button type="primary" @click="clickSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div ref="box" id="box" style="height: 500px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { orderTotal } from "@/api/apis";
export default {
  data() {
    return {
      date: [],
    };
  },
  methods: {
    echarts() {
      orderTotal({
        date: this.date == [] ? JSON.stringify([]) : JSON.stringify(this.date),
      }).then((res) => {
        let arr = res.data.data;
        arr.forEach((v) => {
          v.orderTime = this.dayjs(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        });
        console.log(arr);

        //初始化报表
        let myChart = echarts.init(this.$refs.box);
        //配置
        let option = {
          title: {
            text: "订单统计图",
          },
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
              },
            },
          ],
        };
        //使用配置生成报表
        myChart.setOption(option);
      });
    },
    clickSearch() {
      this.echarts();
    },
  },
  mounted() {
    this.echarts();
  },
};
</script>

<style lang="less" scoped>
button {
  margin-left: 15px;
}
#box {
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
}
</style>