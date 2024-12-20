<script setup lang="ts">
import type { ButtonStyleForEachStatus } from '@/types'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const props = defineProps<{
  cssStyle?: ButtonStyleForEachStatus
  duration?: number
  isLoading?: boolean
  buttonType?: 'button' | 'submit' | 'reset'
}>()

const defaultStyle = props.cssStyle?.default || {}
const hoverStyle = props.cssStyle?.hover || {}
</script>

<template>
  <button
    :class="[
      $style.button,
      { [$style.loading] : isLoading },
    ]"
    :style="{
      '--text-color': defaultStyle?.textColor || 'blue',
      '--background-color': defaultStyle?.backgroundColor || 'inherit',
      '--background-image': defaultStyle?.backgroundImage || 'none',
      '--border-color': defaultStyle?.border?.color || 'blue',
      '--border-size': defaultStyle?.border?.size || '2px',
      '--radius-size': defaultStyle?.border?.radius || '0.25rem',
      '--box-shadow': defaultStyle?.boxShadow || '0 0 0 0 transparent',
      '--hover-text-color': hoverStyle?.textColor || defaultStyle?.textColor || 'var(--text-color)',
      '--hover-background-color': hoverStyle?.backgroundColor || defaultStyle?.backgroundColor || 'var(--background-color)',
      '--hover-background-image': hoverStyle?.backgroundImage || defaultStyle?.backgroundImage || 'var(--background-image)',
      '--hover-border-color': hoverStyle?.border?.color || defaultStyle?.border?.color || 'var(--border-color)',
      '--hover-border-size': hoverStyle?.border?.size || defaultStyle?.border?.size || 'var(--border-size)',
      '--hover-radius-size': hoverStyle?.border?.radius || defaultStyle?.border?.radius || 'var(--radius-size)',
      '--hover-box-shadow': hoverStyle?.boxShadow || defaultStyle?.boxShadow || 'var(--box-shadow)',
      '--duration': `${duration || .3}s`,
    }"
    :type="buttonType || 'button'"
  >
    <div
      v-show="isLoading"
      :class="$style.loading_animation"
    >
      <slot
        v-if="$slots.loading"
        name="loading"
      />
      <LoadingSpinner v-else />
    </div>
    <div>
      <slot />
    </div>
  </button>
</template>

<style lang="scss" module>
:is(.button) {
  display         : inline-flex;
  justify-content : center;
  align-items     : center;
  inline-size     : max-content;
  padding         : .5rem 1rem;
  background-color: var(--background-color);
  box-shadow      :
    0 0 0 var(--border-size) var(--border-color) inset,
    var(--box-shadow);
  border          : none;
  border-radius   : var(--radius-size);
  color           : var(--text-color);
  line-height     : 1;
  transition      : all var(--duration);
  position        : relative;
  cursor          : pointer;

  @media (hover: hover) {
    &:where(:any-link, :enabled, summary):hover {
      background-color: var(--hover-background-color);
      box-shadow      :
        0 0 0 var(--hover-border-size) var(--hover-border-color) inset,
        var(--hover-box-shadow);
      border-radius   : var(--hover-radius-size);
      color           : var(--hover-text-color);
    }
  }

  &.loading {
    pointer-events: none !important;

    &::before {
      content       : '';
      position      : absolute;
      inset         : 0;
      pointer-events: all;
      cursor        : not-allowed !important;
    }

    > *:not(:is(.loading_animation)) {
      visibility: hidden;
    }
  }
}

:is(.loading_animation) {
  max-block-size: calc(100% - 1rem);
  color         : currentColor;
  fill          : currentColor;
  position      : absolute;
  margin        : auto;
  inset         : 0;

  * {
    max-block-size: 100%;
    color         : currentColor;
    fill          : currentColor;
  }
}
</style>