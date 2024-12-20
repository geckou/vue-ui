<script setup lang="ts">
import type {
  StateVariation,
  InputBoxStyle,
  InputBoxStyleForEachStatus,
} from '@/types'
import {
  ref,
  computed,
} from 'vue'

const props = defineProps<{
  cssStyle?: InputBoxStyleForEachStatus
  isErrored?: boolean
  isDisabled?: boolean
}>()

const inputBox = ref<HTMLElement | null>(null)

const isFocused = computed<boolean>(() => {
  return inputBox.value ?
    inputBox.value.matches(':has(*:focus), :has(*:valid)') :
    false
})

const isInvalid = computed<boolean>(() => {
  return inputBox.value ?
    inputBox.value.matches(':has(*:not(:placeholder-shown)), :has(*:autofill), :has(*:invalid)') :
    false
})

const isValid = computed<boolean>(() => {
  return inputBox.value ?
    inputBox.value.matches(':has(*:valid)') :
    false
})

const variant = computed<StateVariation>(() => {
  if (props.isErrored || isInvalid.value) return 'error'
  else if (props.isDisabled) return 'disabled'
  else if (isValid.value) return 'valid'
  else if (isFocused.value) return 'focus'
  else return 'default'
})

const currentStyle = computed<InputBoxStyle | undefined>(() => props.cssStyle?.[variant.value as StateVariation])
</script>

<template>
  <div
    ref="inputBox"
    :class="$style.input_box"
    :style="{
      '--text-color': currentStyle?.textColor || '#333',
      '--placeholder-color': currentStyle?.placeholderColor || '#999',
      '--border-color': currentStyle?.border?.color || '#ccc',
      '--background-color': currentStyle?.backgroundColor || 'inherit',
      '--border-size': currentStyle?.border?.size || '1px',
      '--radius-size': currentStyle?.border?.radius || '0.25rem',
      '--box-shadow': currentStyle?.boxShadow || 'none',
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" module>
:is(.input_box) {
  display: inline-flex;
  max-inline-size: 100%;
  background-color: var(--background-color);
  border: var(--border-size) solid var(--border-color);
  border-radius: var(--radius-size);
  color: var(--text-color);
  position: relative;

  > input,
  > textarea,
  > select {
    inline-size: 100%;
    padding: .5rem 1rem;
    background-color: transparent;
    border: none;
    outline: none;
    appearance: none;
  }

  *::placeholder {
    color: var(--placeholder-color);
    font-weight: normal;
  }

  *:focus,
  *:focus:not(:focus-visible) {
    outline: none;
  }

  &:has(> *:disabled) {
    pointer-events: none !important;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: all;
      cursor: not-allowed !important;
    }
  }
}
</style>