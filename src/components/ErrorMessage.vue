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
}
</style>