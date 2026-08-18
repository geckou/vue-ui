<script setup lang="ts">
import { ref } from 'vue'
type Props = {
  isDisabled? : boolean,
}

withDefaults(defineProps<Props>(), {
  isDisabled: false,
})

const startDate = ref('')
const endDate = ref('')
</script>

<template>
  <div :class="$style.date_range_picker">
    <DatePicker
      v-model="startDate"
      name="startDate"
      :isDisabled="isDisabled"
    />
    <div :class="$style.range">
      〜
    </div>
    <DatePicker
      v-model="endDate"
      name="endDate"
      :isDisabled="isDisabled"
    />
  </div>
</template>

<style lang="scss" module>
.date_range_picker {
  display         : flex;
  background-color: var(--white);

  .range {
    flex          : 0 0 auto;
    display       : flex;
    align-items   : center;
    padding-inline: var(--bv);
  }

  > * {
    flex         : 1 1 auto;
    border-radius: 0;

    &:not(:last-child) {
      border-inline-end: 1px solid var(--border-color);
    }

    &:first-child {
      border-top-left-radius   : calc(var(--bv) / 2);
      border-bottom-left-radius: calc(var(--bv) / 2);
    }
  
    &:last-child {
      border-top-right-radius   : calc(var(--bv) / 2);
      border-bottom-right-radius: calc(var(--bv) / 2);
    }
  }
}
</style>