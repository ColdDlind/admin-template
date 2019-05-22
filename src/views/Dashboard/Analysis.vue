<template>
  <div>
    {{$t("message")["app.dashboard.analysis.timeLable"]}}
    <a-date-picker/>
    <eChart style="height:400px" :options="chartOptions"/>
    <a-button type="primary">Primary</a-button>
  </div>
</template>

<script>
import eChart from "@/components/eChart";
import random from "lodash/random";
import axios from "axios";
export default {
  data() {
    return {
      chartOptions: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  created() {
    axios
      .post("/data/index", {
        pageSize: 20,
        pageNo: 1
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.interver = setInterval(() => {
      this.chartOptions.series[0].data = this.chartOptions.series[0].data.map(
        () => random(100)
      );
      this.chartOptions = { ...this.chartOptions };
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.interver);
  },
  components: {
    eChart
  }
};
</script>

<style>
</style>
