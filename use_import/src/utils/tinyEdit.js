import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme' // 主题文件
// import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/skins/ui/oxide/skin.min.css'
//插件
import 'tinymce/plugins/wordcount'
import '/public/tinymce/plugins/wordlimit'

export default class TinyEdit {
  id = 'tinyEdit';
  content = '';
  setting = {
    selector: "#tinyEdit",
    placeholder: '请输入发音内容',
    menubar: false,      // 隐藏菜单
    branding: false,     // 隐藏右下角技术支持
    // resize: false,       // 禁止调整富文本框大小
    // statusbar: false,    // 隐藏底部状态栏
    toolbar: false,      // 隐藏快捷工具栏
    br_in_pre: false,   //
    quickbars_selection_toolbar: false, // 禁用快速选择工具栏
    forced_root_block: "",    // 强制取消根节点
    plugins: "wordcount, wordlimit",       // 插件：字符统计，不可编辑类，字符限制
    noneditable_class: "mceNonEditable",  // 不可编辑标签类名
    valid_elements: "break phoneme", // 删除所有不是break，phoneme元素。
    extended_valid_elements:
      "break[class=break mceNonEditable], phoneme[class=phoneme mceNonEditable]",
    custom_elements: "~break, ~phoneme",
    content_css: '/test.css',
    importcss_append: true,
    wordlimit:{
      max: 1000
    },
    setup: function (editor) {
       editor.on("click", function (e) {
         const spanName = e.target;
         if (spanName.tagName.toLowerCase() == "break") {
           that.open(e);
         }
       });
       editor.on("keydown", function (e) {
         if (e.keyCode == 13) {
           console.error("换行");
           e.preventDefault();
           return;
         }
       });
     },
  }

  constructor(id, content) {
    this.id = id || this.id
    this.content = content || this.content
    this.setting.selector = `#${this.id}`
    this.init()
  }

 async init(){
    await tinymce.init(this.setting);
    if(this.content) this.setContent(this.content)
  }

  setContent(content) {
    tinymce.activeEditor.setContent(content)
  }

  getContent() {
    return tinymce.activeEditor.getContent()
  }

  insertContent(content) {
    tinymce.activeEditor.insertContent(content)
  }

  colorContent() {
    tinymce.activeEditor.execCommand("ForeColor", false, "#f33");
  }

  destroy() {
    tinymce.activeEditor.selection.destroy();
  }
}
