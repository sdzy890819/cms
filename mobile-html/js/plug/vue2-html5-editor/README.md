> **Forked from** https://github.com/PeakTai/vue-html5-editor (Vue 1+)

# Installation

### Npm


```bash
npm install vue2-html5-editor
```

import and install as global component

```js
var Vue = require("vue")
var editor = require("vue2-html5-editor")
Vue.use(editor, {
    name: 'vue2-html5-editor'
});
```

# Usage

template code as follows

```html
<vue2-html5-editor v-model="content" :height="500"></vue2-html5-editor>
```
