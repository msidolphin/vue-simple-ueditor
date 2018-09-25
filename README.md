# vue-simple-ueditor

> 基于百度UEditor的Vue组件

## Install
```bash
npm install vue-simple-ueditor
```

## Usage

### import
```js
import VueUEditor from 'vue-simple-ueditor'
Vue.use(VueUEditor)
```
### use
```vue
<template>
  <div id="app">
    <ueditor v-model="value" ref="ueditor" @change="onContentChange"></ueditor>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onContentChange (content) {
      console.log('content：' + content)
    }
  }
}
</script>
```

## Props

| attribute | type | description |
| ------ | ------ | ------ |
| value | String | v-model |
| options | Object | ueditor options   http://fex.baidu.com/ueditor/ |
| focus | Boolean | focus the component |
| disabled | Boolean | whether component is disabled |


## Events

| event | description | params |
| ------ | ------ | ------ |
| change | triggers when the value change | content |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
