<template>
  <div ref="editor" class="vue-simple-ueditor"></div>
</template>

<script>
import 'ue/ueditor.config.js'
import 'ue/ueditor.all.js'
import 'ue/ueditor.parse.js'
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
        return {}
      }
    },
    focus: Boolean,
    disabled: Boolean
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
    value (newVal, oldVal) {
      let value = newVal ? newVal : oldVal
      if (this.__isReady() && !this.init) {
        this.currentValue = value
        // 因为setContent会改变光标的位置，所以最早采用上面的方式，但是inserthtml有时会插入换行符
        // this.setContent('', false)
        // this.ue.execCommand('inserthtml', value)
        // 更好的方式：只需要调用focus方法传入的toEnd为true即可解决这个问题
        this.setContent(value, false)
        this.setFocus()
        // 内容初始化完毕
        this.init = true
      }
    }
  },
  methods: {
    __isReady () {
      return this.ready
    },
    initEditor () {
      if (typeof window.UE !== 'undefined') {
        let UE = window.UE
        this.currentValue = this.value
        this.ue = UE.getEditor(this.$refs.editor, this.options)
        this.ue.ready(() => {
          this.ready = true
          if (this.currentValue) {
            this.setContent(this.currentValue)
            this.init = true
          }
          if (this.focus) this.setFocus()
          this.ue.addListener('contentChange', () => {
            this.currentValue = this.ue.getContent()
            this.$emit('input', this.currentValue)
            this.$emit('change', this.currentValue)
          })
        })
      }
    },
    /**
     * 获得内容
     * @method getContent
     */
    getContent () {
      if (this.__isReady()) return this.ue.getContent()
    },
    /**
      * 设置编辑器的内容，可修改编辑器当前的html内容
      * @method setContent
      * @warning 通过该方法插入的内容，是经过编辑器内置的过滤规则进行过滤后得到的内容
      * @warning 该方法会触发selectionchange事件
      * @param { String } html 要插入的html内容
      * @param { Boolean } isAppendTo 若传入true，不清空原来的内容，在最后插入内容，否则，清空内容再插入
     */
    setContent (content, isAppendTo = true) {
      if (this.__isReady()) this.ue.setContent(content, isAppendTo)
    },
    /**
     * 获得整个html的内容
     * @method getAllHtml
     */
    getAllHtml () {
      if (this.__isReady()) return this.ue.getAllHtml()
    },
    /**
     * 获取纯文本
     * @method getContentText
     */
    getContentText () {
      if (this.__isReady()) return this.ue.getContentText()
    },
    /**
     * 获得带格式的纯文本
     * @method getPlainText
     */
    getPlainText () {
      if (this.__isReady()) return this.ue.getPlainText()
    },
    /**
     * 判断编辑器是否有内容
     * @method hasContent
     */
    hasContent () {
      if (this.__isReady()) return this.ue.hasContent()
    },
    /**
     * 使编辑器获得焦点
     * @method setFocus
     */
    setFocus (toEnd = true) {
      if (this.__isReady()) this.ue.focus(toEnd)
    },
    /**
     * 判断编辑器是否获得焦点
     * @method isFocus
     */
    isFocus () {
      if (this.__isReady()) this.ue.isFocus()
    },
    /**
     * 使编辑器失去焦点
     * @method setBlur
     */
    setBlur () {
      if (this.__isReady()) this.ue.blur()
    },
    /**
     * 设置编辑器为可编辑
     * @method setEnabled
     */
    setEnabled () {
      if (this.__isReady()) this.ue.setEnabled()
    },
    /**
     * 设置当前编辑区域不可编辑,except中的命令除外
     * @method setDisabled
     * @param { String } except 例外命令的字符串
     */
    setDisabled (except) {
      if (this.__isReady()) this.ue.setDisabled(except)
    },
    /**
     * 隐藏编辑器
     * @method hide
     */
    hide () {
      if (this.__isReady()) this.ue.setHide()
    },
    /**
     * 显示编辑器
     * @method show
     */
    show () {
      if (this.__isReady()) this.ue.setShow()
    },
    /**
     * 设置编辑器高度
     * @method setHeight
     * @remind 当配置项autoHeightEnabled为真时,该方法无效
     * @param { Number } number 设置的高度值，纯数值，不带单位
     */
    setHeight (height) {
      if (this.__isReady()) this.ue.setHeight(height)
    },
    /**
     * 插入内容
     * @method insertHtml
     * @param {String} value 插入的内容
     */
    insertHtml (value) {
      if (this.__isReady()) this.ue.execCommand('insertHtml', value)
    }
  },
  mounted () {
    this.initEditor()
  }
}
</script>

<style>
@import url('../../static/ueditor/themes/default/css/ueditor.css');
@import url('../../static/ueditor/themes/iframe.css');
</style>
