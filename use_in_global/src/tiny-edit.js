import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'

export default class TinyEdit {
  id = 'tinyEdit';
  content = '';
  setting = {
    selector: "#tinyEdit",
    menubar: false,      // 隐藏菜单
    branding: false,     // 隐藏右下角技术支持
    resize: false,       // 禁止调整富文本框大小
    statusbar: false,    // 隐藏底部状态栏
    toolbar: false,      // 隐藏快捷工具栏
    quickbars_selection_toolbar: false, // 禁用快速选择工具栏
    forced_root_block: "",    // 强制取消根节点
    // plugins: "wordcount noneditable wordlimit",       // 插件：字符统计，不可编辑类，字符限制
    // noneditable_noneditable_class: "mceNonEditable",  // 不可编辑标签类名
    // valid_elements: "break,phoneme", // getContent()时只有自定义标签
  }

  constructor(id, content) {
    this.id = id || this.id
    this.content = content || this.content
    this.setting.selector = `#${this.id}`
    console.log('tinymce',tinymce);
    this.init()
  }

  init(){
    tinymce.init(this.setting);
  }

  getContent() {
    return tinymce.activeEditor.getContent()
  }

  destroy() {
    tinymce.activeEditor.selection.destroy();
  }
}
