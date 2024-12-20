<script setup lang="ts">
import type {
  Option,
  RadioButtonStyleForEachStatus,
} from '@/types'
import {
  ref,
  watch,
  computed,
} from 'vue'

type SelectValue = string | number

const emit = defineEmits<{(e: 'update:modelValue', newValue: SelectValue): void}>()

const props = withDefaults(defineProps<{
  modelValue: SelectValue
  options: Array<Option>
  isDisabled? : boolean
  isRequired?: boolean
  cssStyle?: RadioButtonStyleForEachStatus
  isDisableAnimation?: boolean
}>(), {
  cssStyle: () => ({ default: {} }),
})

const errorMessages = ref<Array<string>>([])
const selectedValue = ref<SelectValue>(props.modelValue ?? '')

const validateValue = () => {
  errorMessages.value = []
  if (!selectedValue.value && props.isRequired) errorMessages.value.push('必須項目です')
}

const currentCssStyle = computed(() => {
  if (props.isDisabled) return props.cssStyle.disabled
  else return props.cssStyle.default
})

watch(() => props.modelValue, newValue => { selectedValue.value = newValue }, { immediate: true })

watch(() => selectedValue.value, newValue => {
  validateValue()
  emit('update:modelValue', newValue)
}, { immediate: !!props.modelValue })
</script>

<template>
  <div :class="$style.radios">
    <label
      v-for="option in options"
      :key="option.value"
      :class="$style.radio"
      :style="{
        '--border-color': currentCssStyle?.border?.color || 'blue',
        '--border-size' : currentCssStyle?.border?.size || '1px',
        '--background-color': currentCssStyle?.backgroundColor || '#fff',
        '--duration': isDisableAnimation ? '0s' : '.3s',
      }"
    >
      <input
        v-model="selectedValue"
        type="radio"
        :name="option.value"
        :value="option.value"
        :disabled="isDisabled"
        :required="isRequired"
        :checked="option.value === selectedValue"
      >
      <span :class="$style.label">
        {{ option.label }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" module>
@keyframes pop {
  0% {
    scale  : 1;
  }

  10% {
    scale  : .8;
  }

  50% {
    scale  : 1.2;
  }

  100% {
    scale: 1;
  }
}

:is(.radios) {
  display    : flex;
  align-items: center;
  flex-wrap  : wrap;
  gap        : 1rem;
}

:is(.radio) {
  display              : grid;
  grid-template-columns: auto 1fr;
  align-items          : center;
  gap                  : .5rem;
  color                : var(--border-color);
  cursor               : pointer;

  &::before {
    content         : '';
    display         : inline-block;
    aspect-ratio    : 1 / 1;
    width           : 1rem;
    box-shadow      : 0 0 0 1px var(--border-color) inset;
    background-color: var(--background-color);
    border-radius   : 50%;
    transition      : all var(--duration) linear;
  }
  
  &:has(input:checked) {
    color: inherit;

    &::before {
      box-shadow      : 0 0 0 2px var(--background-color) inset, 0 0 0 1px var(--border-color);
      background-color: var(--border-color);
      animation       : pop var(--duration) ease-out;
    }
  }

  &:has(input:disabled) {
    pointer-events: none !important;

    &::before {
      content       : '';
      position      : absolute;
      inset         : 0;
      pointer-events: all;
      cursor        : not-allowed !important;
    }
  }

  > input {
    display: none;
  }
}
</style>