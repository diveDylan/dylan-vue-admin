<template>
  <div class="editor-contain">
    <div ref="editor"/>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Editor',
  components: {},
  mixins: [],
  props: {
    htmlText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      editorContent: '',
      editor: null
    }
  },
  computed: {},
  watch: {
    'htmlText': 'setContent'
  },
  mounted() {
    this.init()
  },
  methods: {
    setContent() {
      this.editor.txt.html(this.htmlText)
    },
    init() {
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'foreColor',
        'list',
        'justify',
        'emoticon',
        'undo'
      ]
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('update:content', html)
      }
      this.editor.create()
    }
  }
}
</script>

<style>
.editor-contain {
  width: 800px;
  display: block;
  background: #fff;
}
</style>
