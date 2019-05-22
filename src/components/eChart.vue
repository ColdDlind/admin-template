<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line"
import "echarts/lib/component/tooltip"
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    options: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  watch: {
    options(val) {
      this.chart.setOption(val);
    }
  },
  created() {
    // 防抖
    this.resize = debounce(this.resize, 100);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize(data) {
      if (this.chart) {
        console.log("resize");
        this.chart.resize();
      }
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.options);
    }
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style>
</style>
