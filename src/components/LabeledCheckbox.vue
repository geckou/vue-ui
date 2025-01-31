<script setup lang="ts">
import type { CheckBoxStyleForEachStatus } from '@/types'
import {
  ref,
  computed,
  watch,
} from 'vue'
import CheckBox from '@/components/CheckBox.vue'

const emit = defineEmits<{ (e: 'update:modelValue', newValue: boolean): void }>()

const props = withDefaults(defineProps<{
  name: string
  label: string
  modelValue?: boolean
  isDisabled?: boolean
  cssStyle?: CheckBoxStyleForEachStatus
  isDisableAnimation?: boolean
}>(), {
  cssStyle: () => ({ default: {} }),
})

const isChecked = ref(props.modelValue ?? false)

const currentCssStyle = computed(() => {
  if (props.isDisabled) return props.cssStyle.disabled
  else if (isChecked.value) return props.cssStyle.valid
  else return props.cssStyle.default
})

watch(() => isChecked.value, newValue => emit('update:modelValue', newValue))
watch(() => props.modelValue, newValue => isChecked.value = newValue, { immediate: true })
</script>

<template>
  <label
    :class="$style.labeled_check_box"
    :style="{ '--text-color': currentCssStyle?.textColor || 'black' }"
  >
    <CheckBox
      v-model="isChecked"
      :name="name"
      :isDisabled="isDisabled"
      :cssStyle="cssStyle"
      :isDisableAnimation="isDisableAnimation"
    />
    <span :class="$style.label">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss" module>
.labeled_check_box {
  display    : inline-flex;
  align-items: center;
  gap        : .5em;
  cursor     : pointer;

  .label {
    color: var(--text-color);
  }

  &:has(input:disabled) {
    cursor: auto;
  }
}
</style>