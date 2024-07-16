<template>
  <div id="app">
    <TextBox v-model="text" label="Enter Text:" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const text = ref('')

    return {
      text
    }
  }
})
</script>