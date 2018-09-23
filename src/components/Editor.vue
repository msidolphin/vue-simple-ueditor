<template>
  <div ref="editor"></div>
</template>

<script>
import 'ue/ueditor.config.js'
import 'ue/ueditor.all.js'
import 'ue/ueditor.parse.js'
import 'ue/third-party/zeroclipboard/ZeroClipboard.js'
import 'ue/lang/zh-cn/zh-cn.js'
export default {
  name: 'ueditor',
  props: {
    value: {
      type: [String, Number, Boolean],
      default () {
        return ''
      }
    },
    options: {
      type: Object,
      default () {
        return undefined
      }
    }
  },
  data () {
    return {
      currentValue: '',
      ue: null,
      ready: false,
      init: false
    }
  },
  watch: {
    value () {
      if (this.ready && !this.init) {
        this.currentValue = this.value
        this.ue.setContent(this.currentValue, true)
        this.init = true
      }
    }
  },
  mounted () {
    if (typeof window.UE !== 'undefined') {
      let UE = window.UE
      this.currentValue = this.value
      this.ue = UE.getEditor(this.$refs.editor, this.options ? this.options : {})
      this.ue.ready(() => {
        this.ready = true
        this.ue.setContent(this.currentValue, true)
        this.ue.addListener('contentChange', () => {
          this.currentValue = this.ue.getContent()
          this.$emit('input', this.currentValue)
        })
      })
    }
  }
}
</script>

<style>
@import url('../../static/ueditor/themes/default/css/ueditor.css');
@import url('../../static/ueditor/themes/default/dialogbase.css');
</style>
