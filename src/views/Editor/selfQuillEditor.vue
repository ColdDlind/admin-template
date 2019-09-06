<template>
  <div>
    <div class="editor_wrap">
      <div style="width:60%">
        <quill-editor ref="myQuillEditor" v-model="detailContent" :options="editorOption">
        </quill-editor>
        <el-button style="margin-top:20px" @click="getData">确定</el-button>
      </div>
      <div class="ql-container ql-snow box1">
        <div class="ql-editor">
          <div v-html="this.detailContent"></div>
        </div>
      </div>
    </div>
    <el-dialog title="上传图片" width="60%" top="4vh" center :visible.sync="imgChooseShow">
      <div v-if="imgChooseShow">
        <div style="text-align: center" class="mb10">
          <span>一行：</span>
          <el-input-number size="small" v-model="imageMany" :max="6" :min="1" :step="1" step-strictly></el-input-number>
          <span class="ml10">张图片</span>
        </div>
        <div style="text-align: center;min-height: 30vh">
          <el-upload
            ref="upload"
            style="display: inline-block"
            class="upload-demo"
            name="files"
            multiple
            list-type="picture"
            accept="image/*"
            :headers="uploaderHeaders"
            :action="UploadUrl"
            :on-error="handleError"
            :on-success="handleSuccess"
            :limit="imageMany"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">点击上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且每张图片不超过10M</div>
          </el-upload>
        </div>
        <div style="text-align: center" class="mb20 mt20">
          <el-button type="primary" @click="imgChooseSure">确 认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import "quill/dist/quill.snow.css";
  import {quillEditor} from "vue-quill-editor";

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{header: 1}, {header: 2}],
    [{list: "ordered"}, {list: "bullet"}],
    [{script: "sub"}, {script: "super"}],
    [{indent: "-1"}, {indent: "+1"}],
    [{direction: "rtl"}],
    [{size: ["small", false, "large", "huge"]}],
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{color: []}, {background: []}],
    [{font: []}],
    [{align: []}],
    ["link", "image", "video"],
    ["clean"]
  ];
  export default {
    components: {
      quillEditor
    },
    props: {
      UploadUrl: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        uploaderHeaders: {
          'token': ''
        },
        imgChooseShow: false,
        imgList: [],
        imageMany: 1,
        detailContent: "", //
        editorOption: {
          placeholder: "",
          theme: "snow", // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions, //
              handlers: {
                image: (value) => {
                  if (value) {
                    this.imgChooseShow = true
                  } else {
                    this.quill.format("image", false);
                  }
                },
              }
            }
          },
        }
      };
    },
    created() {
      this.uploaderHeaders.token = this.token
    },
    methods: {
      onEditorChange({editor, html}) {
        this.detailContent = html;
      },
      getData() {
        console.log(this.detailContent);
      },
      //确定图片
      imgChooseSure() {
        if (this.imgList && (this.imgList.length === this.imageMany)) {
          let quill = this.$refs.myQuillEditor && this.$refs.myQuillEditor.quill;
          quill.focus();
          let length = quill.getSelection().index;
          this.imgList.forEach(item => {
            quill.pasteHTML(length, `<img src="${this.$ActiveImgUrlBase + item.smallImageUrl}" width="${(Math.floor((100 / (this.imgList.length))*100)/100).toFixed(2)}%" />`)
          })
          quill.setSelection(length + 1);
          this.imgChooseShow = false
          this.imgList = []
          this.imageMany = 1
        } else {
          this.$message.error(`上传图片数量与填写数量不同!`)
        }
      },
      //上传图片失败
      handleError(error, file) {
        if (file.size > 10 * 1024 * 1024) {
          this.$message.error(`图片大小为 ${((file.size / 1024) / 1024).toFixed(2)}M，超过10M`)
          return
        }
        this.$message.error(`上传图片( ${file.name} )失败!`)
      },
      //上传成功后的回调
      handleSuccess(file, fileList) {
        if (file.code == 'SUCCESS') {
          let obj = {
            imageUrl: file.rows[0].url,
            smallImageUrl: file.rows[0].attach[0],
            staticImageUrl: file.rows[0].staticUrl,
            staticSmallImageUrl: file.rows[0].staticAttach[0],
            name: fileList.name
          }
          this.imgList.push(obj)
        } else {
          this.$message.warning(file.message)
        }
      },
      //单张上传超出限制时提示
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择${this.imageMany}张图片`)
      },
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor && this.$refs.myQuillEditor.quillEditor;
      },
      ...mapGetters(['token'])
    },
    beforeDestroy() {
      this.editor && this.editor.destory();
    },
  };
</script>

<style>
  .box1 {
    width: 375px;
    border: 1px solid red;
    height: 667px;
    margin-left: 20px;
    overflow: auto;
  }

  .editor_wrap {
    display: flex;
    justify-content: space-around
  }

  .editor_wrap .ql-snow .ql-tooltip {
    top: 0 !important;
    left: 0 !important;
  }

  .editor_wrap .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }

  .editor_wrap .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .editor_wrap .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }

  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }

  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }

  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }

  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .editor_wrap .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }
</style>
