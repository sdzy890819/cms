<template>
  <div id="app">
    <vue-editor
      :editor-toolbar="customToolbar">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    data: function () {
      return {
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image', 'code-block']
          ]
      }
    },

    components: {
      VueEditor
    }
  }
</script>