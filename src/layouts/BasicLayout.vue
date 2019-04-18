<template>
  <div>
    <Header/>
    <SlideMenu/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import SlideMenu from "./components/SlideMenu";

export default {
  components: {
    Header,
    Footer,
    SlideMenu
  }
};
</script>

<style>
</style>
