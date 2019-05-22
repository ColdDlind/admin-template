<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view/>
    </a-locale-provider>
  </div>
</template>
<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import en_US from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment";
import "moment/locale/zh-cn"
export default {
  data() {
    return {
      locale: zh_CN
    };
  },
  watch: {
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? en_US : zh_CN;
      moment.locale(val === "enUS" ? "en-us" : "zh-cn");
    }
  }
};
</script>

<style lang="less">
</style>
