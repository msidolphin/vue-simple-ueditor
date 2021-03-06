<template>
  <div class="vue-simple-ueditor-wrapper">
    <div ref="editor" :id="id"></div>
  </div>
</template>

<script>
import 'ue/ueditor.config.js'
import 'ue/ueditor.all.js'
import 'ue/ueditor.parse.js'
import 'ue/lang/zh-cn/zh-cn.js'
export default {
  name: 'ueditor',
  props: {
    id: {
      required: true
    },
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
    disabled: Boolean,
    once: { // 是否只初始化内容一次
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ue: null,
      ready: false,
      init: false,
      pendingValue: '',
      timer: null
    }
  },
  watch: {
    value: {
      handler (value) {
        if (this.ue && this.init && value !== this.ue.getContent()) {
          this.setContent(value, false)
        } else if (!this.init && value) {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            if (this.__isReady()) {
              clearInterval(this.timer)
            }
            this.setContent(value, false)
          }, 20)
        }
      }
    }
  },
  methods: {
    __isReady () {
      return this.ready
    },
    initEditor () {
      if (typeof window.UE !== 'undefined') {
        setTimeout(() => {
          let UE = window.UE
          let initValue = this.value
          try {
            UE.delEditor(this.id, false)
          } catch (e) {
          }
          this.ue = UE.getEditor(this.id, this.options)
          this.ue.ready(() => {
            this.ready = true
            if (this.focus) this.setFocus()
            this.ue.addListener('contentChange', () => {
              let value = this.ue.getContent()
              this.$emit('input', value)
              this.$emit('change', value)
            })
            this.init = true
            if (initValue) {
              clearInterval(this.timer)
              this.setContent(initValue, false)
            }
          })
        }, 0)
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
    this.$nextTick(this.initEditor)
  },
  beforeDestroy () {
    if (typeof window.UE !== 'undefined' && this.ue) {
      let UE = window.UE
      try {
        UE.delEditor(this.id, false)
      } catch (e) {
      }
      this.ue = null
    }
  }
}
</script>

<style>
@import url('../../static/ueditor/themes/default/css/ueditor.css');
@import url('../../static/ueditor/themes/iframe.css');
</style>
