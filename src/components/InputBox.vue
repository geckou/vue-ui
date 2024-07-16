<script setup lang="ts">
import {
  ref,
  computed,
} from 'vue'

type InputVariation = 'default' | 'error' | 'disabled' | 'valid'

type ColorStyle = {
  text: string
  border: string
  background: string
}

const inputBox = ref<HTMLElement | null>(null)
const color = {
  white: '#FFFFFF',
  black: '#555555',
  red  : '#FF0000',
}

const props = withDefaults(defineProps<{
  errorMessages?: Array<string>
  isValid?: boolean
  isDisabled?: boolean
  style?: {
    border?: {
      size?: string
      radius?: string
    }
    boxShadow?: string
    color?: Record<InputVariation, ColorStyle>
    error?: Record<string, string>
    focus?: Record<string, string>
  }
}>(), {
  errorMessages: [],
  style: {
    border: {
      size: '1px',
      radius: '.5rem'
    },
    boxShadow: 'none',
    color: {
      default: {
        text: color.black,
        border: 'var(--input-border-color)',
        background: color.white,
      },
      valid: {
        text: color.black,
        border: 'var(--input-border-color)',
        background: color.white,
      },
      error: {
        text: color.black,
        border: color.red,
        background: color.white,
      },
      disabled: {
        text: color.black,
        border: 'var(--input-border-color)',
        background: color.white,
      },
    },
    error: {
      color: color.red
    },
    focus: {
      color: color.black
    }
  }
})

const variant = computed<InputVariation>(() => {
  if (props.errorMessages?.length) return 'error'
  else if (props.isDisabled) return 'disabled'
  else if (props.isValid) return 'valid'
  else return 'default'
})

const errorStyle = computed<Record<string, string>>(() => props.errorMessages?.length ? props.style.error : {})

const focusStyle = computed<Record<string, string>>(() => {
  if (!inputBox.value) return {}
  else if (inputBox.value.matches(':has(*:focus)') || inputBox.value.matches(':has(*:valid)')) return props.style.focus
  else return {}
})
</script>

<template>
  <div
    ref="inputBox"
    :class="$style.input_box"
    :style="{
      '--text-color': props.style.color[variant].text,
      '--border-color': props.style.color[variant].border,
      '--background-color': props.style.color[variant].background,
      '--border-size': props.style.border.size,
      '--radius-size': props.style.border.radius,
      '--box-shadow': props.style.boxShadow,
      errorStyle,
      focusStyle,
    }"
  >
    <slot />
    <span
      v-if="errorMessages.length"
      :class="$style.error_messages"
    >
      <span
        v-for="message in errorMessages"
        :key="message"
      >
        {{ message }}
      </span>
    </span>
  </div>
</template>

<style module>
.input_box {
  display       : inline-block;
  padding-inline: .5rem;
  position      : relative;
}

.input_box.disabled {
  pointer-events: none;
  cursor: not-allowed;
}

:is(
  .input_box:has(*:not(:placeholder-shown)),
  .input_box:has(*:autofill),
).input_box:has(*:invalid) {
  box-shadow: none;
}

.error_messages {
  position: absolute;
  top     : calc(100% - .5rem);
  left    : .5rem;
}

:is(
  .error_messages::before,
  .error_messages::after,
) {
  content         : '';
  display         : block;
  background-color: var(--background-color);
  inline-size     : .5rem;
  block-size      : .25;
  clip-path       : polygon(50% 0%, 100% 100%, 0% 100%);
  position        : absolute;
  bottom          : 100%;
}

.error_messages::before {
  inline-size     : calc(.5rem + 2px);
  block-size      : calc(.25rem + 1px);
  background-color: var(--border-color);
  left            : calc(.5rem - 1px);
}

.error_messages::after {
  background-color: var(--background-color);
  left            : .5rem;
}
</style>