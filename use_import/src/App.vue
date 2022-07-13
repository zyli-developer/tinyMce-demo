<template>
  <div id="app">
    <input type="button" @click="getContent" value="获得内容" />
    <input type="button" @click="getNode" value="获得选中内容" />
    <input type="button" @click="getText" value="获得纯文本" />
    <input type="button" @click="goEnd" value="光标放最后" />
    <input type="button" @click="setContent" value="设置内容" />
    <input type="button" @click="colorContent" value="标红文字" />
    <input type="button" @click="mceImage" value="打开图片对话框" />
    <div id="edit" @click="imageEnlargement"></div>
    <!-- <vue-tinymce
      ref="editorRef"
      v-model="content"
      :setting="setting"
      :setup="setup"
    /> -->
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      content:
        '你好吗<phoneme py="hao3" data-id="14117837-857a-4224-9c46-f426eff2aedf" data-text="好" onclick="event()">好</phoneme><break class="mceNonEditable" time="500ms" data-text="停" data-id="02c80115-0141-4165-b9d8-55c862bb975a">停</break>吗<break data-id="69baf3d7-6044-4e23-93da-658d312984ac" data-text="停" time="2900ms">停</break>你好<break data-id="052f5d53-871a-4863-a6db-e48c44c084d3" data-text="停" time="100ms">停</break>测试',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeDestroy() {
    window.tinymce.remove("#tincyme"); //一定要销毁 否则每次都需要刷新页面才能初始化
  },
  methods: {
    init() {
      tinymce.init({
        selector: "#edit",
        auto_focus: true,
        menubar: false,
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: ["wordcount"],
        toolbar: "wordcount",
        forced_root_block: "",
        branding: false,
        // noneditable_regexp: "/<break(.*?)<\\/break>/g",
        valid_elements: "break,phoneme", // getContent()时只有自定义标签
        flash_video_player_url: false,
        br_in_pre: false,
        contextmenu: "bold italic",
        language: "zh_CN",
        height: 350,
        visual: false,
        extended_valid_elements: ["break", "phoneme"],
        custom_elements: ["~break", "~phoneme"],
        // invalid_elements: ["break", "phoneme"],
        content_style:
          "p, div {font-size: 14px; margin: 0px; border:0px ; padding: 0px} break {margin: 0 2px;cursor: pointer;display: inline-block;height: 20px;line-height: 20px;font-size: 12px;text-align: center;transform: translateY(-1px);box-shadow: 0 0 0 1px red}phoneme {display: inline-block;cursor: pointer;transition: background-color 0.3s ease;background-color: rgba(127, 127, 127, 0.2);break:hover {background-color: yellow;color: #fff;}}",
        // content_css: "/test.scss?" + new Date().getTime(),
        formats: {
          phoneme: { attributes: { "data-style": "bold" } },
        },
        debug: true,
        setup: function (editor) {
          editor.on("keyup", function (e) {
            console.log("回车", e);
            if (e.code === "Enter") {
              const cnt = tinyMCE.editors["edit"].getContent();
              console.log("keyup", cnt);
              tinyMCE.editors["edit"].setContent(cnt);
              const editor = tinyMCE.editors["edit"];
              editor.execCommand("selectAll");
              editor.selection.getRng().collapse(false);
              editor.focus();
            }
          });
          editor.on("change", function (e) {
            console.log("change event");
          });
          editor.on("click", function (e) {
            console.log("change event", e);
          });
        },
      });
    },
    getText() {
      var cnt = tinyMCE.editors["edit"].getContent({ format: "text" });
      console.log(cnt);
    },
    getContent() {
      const cnt = tinyMCE.editors["edit"];
      console.log("getContent", cnt.getContent());
      console.log("getRng", tinymce.activeEditor.selection.getRng());
      console.log("getEel", tinymce.activeEditor.selection.getSel());
    },
    goEnd() {
      const editor = tinyMCE.editors["edit"];
      editor.execCommand("selectAll");
      editor.selection.getRng().collapse(false);
      editor.focus();
      console.log("editor", editor);
    },
    imageEnlargement(e) {
      console.log(e);
      if (e.target.nodeName == "pboneme") {
        //判断点击富文本内容为img图片
        ImagePreview({
          images: [e.target.currentSrc], //获取当前图片src
          showIndex: false,
          loop: false,
        });
      } else {
        console.log("点击内容不为img");
      }
    },
    getNode() {
      console.log(
        tinymce.activeEditor.selection.select(
          tinymce.activeEditor.dom.select("p")[0]
        )
      );
    },
    colorContent() {
      tinyMCE.editors["edit"].execCommand("ForeColor", false, "#f33");
    },
    setContent() {
      tinyMCE.editors["edit"].setContent(this.content);
    },
    mceImage() {
      tinyMCE.editors["edit"].execCommand("mceImage");
    },
    setup(editor) {
      console.log(editor);
    },
  },
};
</script>

<style>
#logo {
  text-align: center;
}
</style>
