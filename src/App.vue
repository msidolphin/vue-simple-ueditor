<template>
  <div id="app">
    <editor v-model="value" ref="ueditor" @change="onContentChange"></editor>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'

export default {
  name: 'App',
  components: {
    Editor
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onContentChange (content) {
      console.log('编辑器内容：' + content)
      this.value = content
    }
  },
  mounted () {
    setTimeout(() => {
      this.value = '<h1 style="font-size: 32px; font-weight: bold; border-bottom: 2px solid rgb(204, 204, 204); padding: 0px 4px 0px 0px; text-align: center; margin: 0px 0px 20px;">Hello UEditor</h1>'
    }, 500)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 860px;
  margin: 0 auto;
  padding-bottom: 25px;
}
</style>
