<script setup lang="ts">
defineProps<{ isDisabled?: boolean }>()
</script>

<template>
  <fieldset
    :class="$style.fieldset"
    :disabled="isDisabled"
  >
    <legend
      v-if="$slots.label"
      :class="$style.legend"
    >
      <slot name="label" />
    </legend>
    <div>
      <slot />
    </div>
  </fieldset>
</template>

<style lang="scss" module>
.fieldset {
  margin : 0;
  padding: 0;
  border : none;
}

.legend {
  display         : flex;
  align-items     : center;
  inline-size     : 100%;
  margin-block-end: .5rem;
}
</style>