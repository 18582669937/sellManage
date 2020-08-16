<template>
  <div class="content">
    <el-row class="card">
      <el-col :span="6" v-for="(item,index) in CardData" :key="index">
        <Card :item="item" />
      </el-col>
    </el-row>
    <div class="echart">
      <div ref="box" id="box" style="height: 500px;"></div>
    </div>
  </div>
</template>

<script>
import Pane from "@/components/Pane";
import Card from "@/components/Card";
import echarts from "echarts";
import { totalData } from "@/api/apis";

export default {
  components: {
    Card,
    Pane,
  },
  data() {
    return {
      CardData: [
        {
          icon: "el-icon-document",
          title: "总订单",
          count: "",
          color: "#5EB8E7",
        },
        {
          icon: "iconfont icon-huodongxiaoshouezhishu-xiaotu",
          title: "销售金额",
          count: "",
          color: "#D4237A",
        },
        {
          icon: "el-icon-notebook-2",
          title: "今日订单",
          count: "",
          color: "#1296DB",
        },
        {
          icon: "iconfont icon-qian",
          title: "今日销售额",
          count: "",
          color: "#1AFA29",
        },
      ],
    };
  },
  methods: {
    echarts() {
      totalData().then((res) => {
        let arr = [
          res.data.totalOrder,
          res.data.totalAmount,
          res.data.todayOrder,
          res.data.totayAmount,
        ];
        arr.forEach((v, i) => {
          this.CardData[i].count = v;
        });

        //初始化报表
        let myChart = echarts.init(this.$refs.box);
        //配置
        let option = {
          title: {
            text: "折线图堆叠",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["订单数据", "金额数据"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: res.data.xData,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: res.data.orderData,
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: res.data.amountData,
            },
          ],
        };
        //使用配置生成报表
        myChart.setOption(option);
      });
    },
  },
  mounted() {
    this.echarts();
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
}
.card {
  display: flex;
  justify-content: space-between;
  .el-col {
    margin-right: 20px;
  }
}
.echart {
  width: 100%;
  background-color: #fff;
  margin-top: 40px;
  padding: 20px;
  box-sizing: border-box;
  #box {
    width: 100%;
  }
}
</style>