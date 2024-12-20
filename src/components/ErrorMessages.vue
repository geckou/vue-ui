<script lang="ts" setup>
defineProps<{ errorMessages?: Array<string> }>()
</script>

<template>
  <div
    v-if="errorMessages && errorMessages.length"
    :class="$style.error_messages"
  >
    <span
      v-for="message in errorMessages"
      :key="message"
    >
      {{ message }}
    </span>
  </div>
</template>

<style lang="scss" module>
.error_messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--error-color);
  margin-top: 0.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  background-color: var(--error-background-color);
  box-shadow: 0 0 0.25rem 0 var(--error-shadow-color);
  transition: all 0.25s ease;
  animation: fadeIn 0.25s ease;
  animation-fill-mode: forwards;
  animation-delay: 0.25s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-play-state: running;
  animation-timing-function: ease;
  animation-name: fadeIn;
}
</style>