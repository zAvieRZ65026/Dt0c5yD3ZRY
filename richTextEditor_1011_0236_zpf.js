// 代码生成时间: 2025-10-11 02:36:17
import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// 使用Vue插件
Vue.use(VueQuillEditor);

export default {
  name: 'RichTextEditor',
  data() {
    return {
      content: '<p>Hello World!</p>'
    };
  },
  methods: {
    // 保存富文本内容
    saveContent() {
      try {
        // 可以在这里添加保存到数据库的逻辑
        console.log('Content saved:', this.content);
      } catch (error) {
        // 错误处理
        console.error('Error saving content:', error);
      }
    }
  }
};
