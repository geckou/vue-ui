<script setup lang="ts">
import type {
  StateVariation,
  InputBoxStyle,
  InputBoxStyleForEachStatus,
} from '@/types'
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
} from 'vue'

const props = defineProps<{
  cssStyle?: InputBoxStyleForEachStatus
  isErrored?: boolean
  isDisabled?: boolean
}>()

const TEXT_COLOR = '#333'
const PLACEHOLDER_COLOR = '#999'
const BORDER_COLOR = '#ccc'
const DISABLED_COLOR = '#f9f9f9'
const CAUTION_COLOR = '#aa0000'
const VALID_COLOR = '#28a745'
const FOCUS_COLOR = '#007bff'
const inputBox = ref<HTMLElement | null>(null)

const cssStylesUsed = computed<InputBoxStyleForEachStatus>(() => {
  const BORDER = {
    color : BORDER_COLOR,
    size  : '1px',
    radius: '.25rem',
  }

  return props.cssStyle ? props.cssStyle : {
    default: {
      textColor       : TEXT_COLOR,
      placeholderColor: PLACEHOLDER_COLOR,
      backgroundColor : 'inherit',
      border          : BORDER,
      boxShadow       : '0 0 0 0 rgba(0, 0, 0, 0)',
    },
    disabled: {
      textColor       : PLACEHOLDER_COLOR,
      placeholderColor: PLACEHOLDER_COLOR,
      backgroundColor : DISABLED_COLOR,
      border          : BORDER,
      boxShadow       : '0 0 0 0 rgba(0, 0, 0, 0)',
    },
    focus: {
      textColor       : TEXT_COLOR,
      placeholderColor: PLACEHOLDER_COLOR,
      backgroundColor : 'inherit',
      border          : {
        ...BORDER,
        color: FOCUS_COLOR,
      },
      boxShadow: `0 0 .1rem .1rem ${FOCUS_COLOR}55`,
    },
    error: {
      textColor       : TEXT_COLOR,
      placeholderColor: PLACEHOLDER_COLOR,
      backgroundColor : `${CAUTION_COLOR}11`,
      border          : {
        ...BORDER,
        color: CAUTION_COLOR,
      },
      boxShadow: `0 0 .1rem .1rem ${CAUTION_COLOR}55`,
    },
    valid: {
      textColor       : TEXT_COLOR,
      placeholderColor: PLACEHOLDER_COLOR,
      backgroundColor : `${VALID_COLOR}11`,
      border          : {
        ...BORDER,
        color: VALID_COLOR,
      },
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    },
  }
})

const currentStyle = computed<InputBoxStyle>(() => cssStylesUsed.value[currentState.value as StateVariation] ?? cssStylesUsed.value.default)
const currentState = ref<StateVariation>('default')

const checkElementState = (el: Element | null | undefined) => {
  if (!el) currentState.value = 'default'
  else if (el.matches(':disabled')) currentState.value = 'disabled'
  else if (el.matches(':focus')) currentState.value = 'focus'
  else if (el.matches(':valid') && el.matches(':not(:placeholder-shown)') && el.matches(':not(:invalid')) currentState.value = 'valid'
  else if (el.matches(':invalid')) currentState.value = 'error'
  else currentState.value = 'default'
}

const updateState = () => {
  const el = inputBox.value?.querySelector('input, textarea, select')
  checkElementState(el)
}

onMounted(() => {
  if (!inputBox.value) return
  const observer = new MutationObserver(updateState)
  observer.observe(inputBox.value, { childList: true, subtree: true })
  inputBox.value.addEventListener('focusin', updateState, true)
  inputBox.value.addEventListener('focusout', updateState, true)
  updateState()
})

onUnmounted(() => {
  if (!inputBox.value) return
  inputBox.value.removeEventListener('focusin', updateState, true)
  inputBox.value.removeEventListener('focusout', updateState, true)
})
</script>

<template>
  <div
    ref="inputBox"
    :class="$style.input_box"
    :style="{
      '--text-color': currentStyle.textColor || TEXT_COLOR,
      '--placeholder-color': currentStyle.placeholderColor || PLACEHOLDER_COLOR,
      '--border-color': currentStyle.border?.color || BORDER_COLOR,
      '--background-color': currentStyle.backgroundColor || 'inherit',
      '--border-size': currentStyle.border?.size || '1px',
      '--radius-size': currentStyle.border?.radius || '.25rem',
      '--box-shadow': currentStyle.boxShadow || '0 0 0 0 rgba(0, 0, 0, 0)',
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
  box-shadow:
    0 0 0 var(--border-size) var(--border-color) inset,
    var(--box-shadow);
  border-radius: var(--radius-size);
  color: var(--text-color);
  position: relative;

  > input,
  > textarea,
  > select {
    inline-size: 100%;
    padding: .5rem;
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