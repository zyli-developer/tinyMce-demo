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
    <input type="button" @click="BeforeSetContent" value="BeforeSetContent" />
    <textarea id="edit" maxlength=2></textarea>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
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
    tinyMCE.editors["edit"].destroy();
    //一定要销毁 否则每次都需要刷新页面才能初始化
  },
  computed: {
    word() {
      const num = tinymce.activeEditor.plugins.wordcount.body.getWordCount();
      console.log("num", num);
      if (num > 10) this.textSubstring();
      return num;
    },
  },
  watch: {
    max(val) {
      if (val > 10) {
        this.textSubstring();
      }
    },
  },
  methods: {
    init() {
      const that = this;
      tinymce.init({
        selector: "#edit",
        auto_focus: true,
        menubar: "",
        plugins: "wordcount noneditable",
        toolbar: false,
        forced_root_block: "",
        noneditable_noneditable_class: "mceNonEditable",
        valid_elements: "break,phoneme", // getContent()时只有自定义标签
        flash_video_player_url: false,
        br_in_pre: false,
        branding: false, // 隐藏右下角技术支持
        // contextmenu: "bold italic",
        language: "zh_CN",
        height: 350,
        //  charLimit : 10,
        visual: false,
        extended_valid_elements: [
          "break[class=break mceNonEditable]",
          "phoneme[class=phoneme mceNonEditable]",
        ],
        custom_elements: ["~break", "~phoneme"],
        content_css: "/test.css?" + new Date().getTime(),
        importcss_append: true,
        // wordlimit: {
        //   max: 10, // 最多可以输入多少字
        // },
        // ax_wordlimit_num: 5,
        // ax_wordlimit_callback: function (editor, txt, num) {
        //   let oldContent = editor.getContent();
        //   console.log('oldContent', oldContent);
        //   var wordcount = tinymce.activeEditor.plugins.wordcount;
        // },
        setup: function (editor) {
          editor.on("compositionstart", function (e) {
            console.log("compositionstart", e);
            var wordcount = tinymce.activeEditor.plugins.wordcount.body.getWordCount();
            if (wordcount > 10) {
              tinymce.dom.Event.cancel(e);
              console.error("compositionstart");
              e.preventDefault();
              e.stopPropagation();
            }
          });
          // editor.on('compositionend', function (e) {
          //   console.log('compositionend', e);
          //   var wordcount = tinymce.activeEditor.plugins.wordcount.body.getWordCount();
          //   if(wordcount > 10 ) e.preventDefault();
          // })
          editor.on("beforeinput", function (e) {
            console.log("beforeinput", e);
            // that.data = e.data
            // if(maxLenght > 10 && e.inputType == "insertCompositionText"){
            //   that.debounce(that.textSubstring(), 300)
            // }
            var wordcount = tinymce.activeEditor.plugins.wordcount;
            const maxLenght = wordcount.body.getWordCount();
            console.log("maxLenght", maxLenght);
            if (maxLenght > 10 && e.inputType != "deleteContentBackward") {
              const cnt = tinyMCE.editors["edit"].getContent({ format: 'text' })
              console.log(cnt);
              console.error("超出", e.data.length);
              // const str = cnt.slice(cnt_index, e.data.length)
              // const strCnt =  new RegExp(cnt[cnt_index],"g")
              // var newStr = cnt.replace(strCnt,"$'");
              // console.error('超出???',newStr);
              // tinyMCE.editors["edit"].setContent(newStr);
              e.preventDefault();
              return false;
            }
          });
          editor.on("click", function (e) {
            console.log("change event", e);
            tinymce.activeEditor.mode.set("design");
            const spanName = e.target;
            if (spanName.tagName.toLowerCase() == "break") {
              that.open(e);
            }
          });
          editor.on("keydown", function (e) {
            console.log("keydown", e);
            if (e.keyCode == 13) {
              console.error("换行");
              e.preventDefault();
              return;
            }
            //  var wordcount = tinymce.activeEditor.plugins.wordcount;
            // const maxLenght = wordcount.body.getWordCount()
            // if(maxLenght > 10  && e.keyCode != '8'){
            //   console.error('chaochu ')
            //   e.preventDefault();
            //   return;
            // }

            // if(maxLenght > 10){
            //   that.debounce(that.textSubstring(), 300)
            // }
          });
          editor.on("keyup", function (e) {
            console.log("keyup", e.isComposing);
            var wordcount = tinymce.activeEditor.plugins.wordcount.body.getWordCount();
            // that.max = wordcount.body.getWordCount()
            // if(wordcount > 10  && e.keyCode > 0 && e.keyCode < 255 && e.code == "Space"){
            //   console.error('超出 ')
            //   e.preventDefault();
            //   return;
            // }
          });
        },
      });
    },
    BeforeSetContent(evt) {
      tinyMCE.editors["edit"].BeforeSetContent({ content: "string" });
    },

    textSubstring(e) {
      const cnt = tinyMCE.editors["edit"].getContent();
      const dataLength = this.data.length;
      let cnts = cnt.substring(0, cnt.length - dataLength);
      console.log("cnt", cnts);
      tinyMCE.editors["edit"].setContent(cnts);
      this.goEnd();
    },

    debounce(fn, delay) {
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer);
          timer = setTimeout(fn, delay);
        } else {
          timer = setTimeout(fn, delay);
        }
      };
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
      tinyMCE.editors["edit"].insertContent(
        "<phoneme contenteditable='false' py='hao3' data-id='14117837-857a-4224-9c46-f426eff2aedf' data-text='好' >好</phoneme>"
      );
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
      const cnt = tinyMCE.editors["edit"];
      console.log("getContent", cnt.getContent());   //  文本内容
      console.log("getRng", tinymce.activeEditor.selection.getRng());  // 选择范围
      console.log("getEel", tinymce.activeEditor.selection.getSel());  // 选择内容
    },
    goEnd() {
      const editor = tinyMCE.editors["edit"];
      editor.execCommand("selectAll");
      editor.selection.getRng().collapse(false);
      editor.focus();
      console.log("editor", editor);
    },

    colorContent() {
      tinyMCE.editors["edit"].execCommand("ForeColor", false, "#f33");
    },

    setContent(val) {
      console.log("this.content", this.content);
      const str = val ? val : this.content;
      tinyMCE.editors["edit"].setContent(this.content);
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
