<template>
  <div style="display:flex">
    <div style="width:60%">
      <a-upload
        name="file"
        :multiple="true"
        id="avatar-uploader"
        action="http://localhost/thinkphp/index.php/Home/Index/upload"
        @change="handleChange"
        style="display:none"
      >
        <a-button>
          <a-icon type="upload"/>Click to Upload
        </a-button>
      </a-upload>
      <quill-editor ref="myQuillEditor" v-model="detailContent" :options="editorOption"></quill-editor>
      <a-button style="margin-top:20px" @click="getData">确定</a-button>
    </div>
    <div v-html="this.detailContent" class="box1"></div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      detailContent: "<h2>I am Example</h2>", // 富文本内容
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  console.log(11111111);
                  console.log(document.querySelector("#avatar-uploader"));
                  document.querySelector("#avatar-uploader").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    onEditorChange({ editor, html }) {
      this.detailContent = html;
    },
    getData() {
      console.log(this.detailContent);
    },
    handleChange(data) {
      if (data.file.response) {
        let quill = this.$refs.myQuillEditor.quill;
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", data.file.response.path);
        // 调整光标到最后
        quill.setSelection(length + 1);
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quillEditor;
    }
  },
  mounted() {
    console.log("this is my editor", this.editor);
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
.box1 img {
  width: 100%;
}
</style>
