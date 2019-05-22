<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global"/>
      <a-menu slot="overlay" @click="visibleChange" :selectedKeys="[$route.query.locale || 'zhCN']">
        <a-menu-item key="zhCN">中文</a-menu-item>
        <a-menu-item key="enUS">英文</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    visibleChange({ key }) {
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      this.$i18n.locale = key;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  float: right;
  margin-right: 20px;
  width: 100px;
  text-align: right;
}
</style>
