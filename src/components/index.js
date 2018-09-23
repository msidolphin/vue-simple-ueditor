import Editor from './Editor.vue'

export default {
  version: '1.0.0@beta',
  install: Vue => {
    Vue.component(Editor.name, Editor)
  },
  Editor
}
