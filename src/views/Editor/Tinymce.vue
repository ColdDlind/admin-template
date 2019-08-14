<template>
  <div style="display:flex">
    <div style="width:60%">
      <tinymce id="d1" v-model="text" :other_options="options" style></tinymce>
      <a-button style="margin-top:20px" @click="getData">确定</a-button>
    </div>
    <div v-html="this.text" class="box1"></div>
  </div>
</template>

<script>
import tinymce from "vue-tinymce-editor";
import "./tinymce/zh_CN.js";
export default {
  data() {
    return {
      text: "",
      options: {
        height: "800px",
        toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `
      }
    };
  },
  components: {
    tinymce
  },
  methods: {
    getData() {
      console.log(this.text);
    }
  }
};
</script>

<style>

.box1 {
  width: 375px;
  border: 1px solid red;
  height: 667px;
  margin-left: 20px;
  overflow-y: scroll;
  padding: 20px;
}

</style>
