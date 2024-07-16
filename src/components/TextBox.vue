<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue'

const inputValue = ref('')

watch(() => inputValue.value, (value) => {
  
})

</script>

<template>
  <InputBox class="text-box">
    <input
      :type="type"
      v-model="inputValue"
      @input="$emit('update:modelValue', inputValue)"
      class="input"
    />
  </InputBox>
</template>



<style scoped>
.text-box {
  margin-bottom: 1rem;
}
.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
}
</style>