<template>
  <div id="app">
    <input type="button" @click="getContent" value="获得内容" />
    <input type="button" @click="getText" value="获得纯文本" />
    <input type="button" @click="SelectText" value="获得选中内容" />
    <input type="button" @click="insertContent" value="插入内容" />
    <input type="button" @click="goEnd" value="光标放最后" />
    <input type="button" @click="setContent" value="设置内容" />
    <input type="button" @click="colorContent" value="标红文字" />
    <input type="button" @click="mceImage" value="打开图片对话框" />
    <div  id="edit"></div>
  </div>
</template>

<script>
import TinyEdit from "./utils/tinyEdit"
export default {
  name: "app",
  data() {
    return {
      tiny:'',
      data: "", // 输入法输入的值
      max: 0, // 文本长度
      content:
        '你好吗<phoneme py="hao3" data-id="14117837-857a-4224-9c46-f426eff2aedf" data-text="好" >好</phoneme><break time="500ms" data-text="停" data-id="02c80115-0141-4165-b9d8-55c862bb975a">停</break>吗<break contenteditable="false" data-id="69baf3d7-6044-4e23-93da-658d312984ac" data-text="停" time="2900ms">停</break>你好<break data-id="052f5d53-871a-4863-a6db-e48c44c084d3" data-text="停" time="100ms">停</break>测试',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeDestroy() {
    this.tiny.destroy();
    //一定要销毁 否则每次都需要刷新页面才能初始化
  },
  methods: {
    init() {
      const that = this;
      this.tiny = new TinyEdit('edit','nih')
      console.log('tiny', this.tiny);
    },

    open(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    insertContent() {
      this.tiny.insertContent("<phoneme contenteditable='false' py='hao3' data-id='14117837-857a-4224-9c46-f426eff2aedf' data-text='好' >好</phoneme>")
    },
    SelectText() {
      const str = tinymce.activeEditor.selection.getSel();
      console.log("str", str);
    },
    getText() {
      var cnt = tinyMCE.editors["edit"].getContent({ format: "text" });
      console.log(cnt);
    },
    getContent() {
      const cnt = this.tiny.getContent();
      console.log('getcontent', cnt);
      // const cnt = tinyMCE.editors["edit"];
      // console.log("getContent", cnt.getContent());   //  文本内容
      // console.log("getRng", tinymce.activeEditor.getContent());  // 选择范围
    },
    goEnd() {
      const editor = tinyMCE.editors["edit"];
      editor.execCommand("selectAll");
      editor.selection.getRng().collapse(false);
      editor.focus();
      console.log("editor", editor);
    },

    colorContent() {
      this.tiny.colorContent()
      // tinyMCE.editors["edit"].execCommand("ForeColor", false, "#f33");
    },

    setContent(val) {
      // console.log("this.content", this.content);
      // const str = val ? val : this.content;
      // tinyMCE.editors["edit"].setContent(this.content);
      this.tiny.setContent(this.content)
    },

    mceImage() {
      tinyMCE.editors["edit"].execCommand("mceImage");
    }
  },
};
</script>

<style>
#logo {
  text-align: center;
}
</style>
