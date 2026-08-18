<script setup lang="ts">
const props = withDefaults(defineProps<{
  excerpt: string
  color?: string
  fontSize?: string
  row?: number
}>(), {
  color   : 'var(--text-color)',
  fontSize: 'medium',
  row     : 3,
})
</script>

<template>
  <div
    :class="$style.excerpt"
    :style="{
      '--excerpt-color': color,
      '--excerpt-font-size': fontSize,
      '--excerpt-row': row,
    }"
    v-html="excerpt"
  />
</template>

<style lang="scss" module>
@use '@/assets/scss/mixin' as *;

.excerpt {
  color    : var(--excerpt-color);
  font-size: var(--excerpt-font-size);

  > * {
    @include textEllipsis(var(--excerpt-row));
    margin: 0;

    &:not(:first-child) {
      display: none;
    }
  }
}
</style>