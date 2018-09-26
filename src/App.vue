<template>
  <div id="app">
    <editor v-model="value" ref="ueditor" once :options="options" @change="onContentChange"></editor>
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
      value: '',
      options: {
        serverUrl: '/eshop/editor/file'
      }
    }
  },
  methods: {
    onContentChange (content) {
      console.log('编辑器内容：' + content)
    }
  },
  mounted () {
    setTimeout(() => {
      this.value = 'Hello UEditor'
    }, 500)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 860px;
  margin: 0 auto;
  padding-bottom: 25px;
}
</style>
