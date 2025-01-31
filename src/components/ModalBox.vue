<script setup lang="ts">
const props = defineProps<{
  isShown: boolean,
  size?: 'small' | 'medium' | 'large',
}>()

const emit = defineEmits<{ (e: 'closeModal', state: Boolean): void }>()
const bodyElement = document.querySelector('body') as HTMLElement
const isLocked = useScrollLock(bodyElement)
const toggleScrollLock = useToggle(isLocked)

const closeModal = () => {
  toggleScrollLock(false)
  bodyElement.style.overflow = ''
  emit('closeModal', false)
}

watch(() => props.isShown, newVal => {
  if (newVal) toggleScrollLock(true)
  else closeModal()
})

onMounted(() => toggleScrollLock(props.isShown))
onBeforeUnmount(() => closeModal())
</script>

<template>
  <div
    :class="[$style.overlay, {[$style.display]: isShown}]"
    @click.self="closeModal"
  >
    <div :class="[$style.container, $style[size ?? 'medium'],]">
      <header
        v-if="$slots.header"
        :class="$style.header"
      >
        <slot name="header" />
      </header>
      <div :class="$style.contents">
        <slot />
      </div>
      <footer
        v-if="$slots.footer"
        :class="$style.footer"
      >
        <slot name="footer" />
      </footer>
      <button
        type="button"
        :class="$style.close_button"
        @click="closeModal"
      >
        <IconClose />
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display         : flex;
  flex-direction  : column;
  inline-size     : 100%;
  max-inline-size : var(--desktop-lower-width);
  max-block-size  : 100%;
  background-color: var(--white);
  border-radius   : var(--radius-small);
  cursor          : auto;
  filter          : drop-shadow(0 0 6px var(--shadow-color));
  position        : relative;

  &.small {
    max-inline-size: var(--mobile-lower-width);
  }

  &.large {
    max-inline-size: var(--contents-max-width);
  }
}

.header {
  padding: var(--sp-medium) var(--sp-large);
  border-block-end: 1px solid var(--light-border-color);

  > h2 {
    font-size  : var(--fs-large);
    font-weight: bold;
  }

  @include media('mobile') {
    padding: var(--sp-medium);
  }
}

.contents {
  flex    : 1 1 auto;
  overflow: auto;
  padding : var(--sp-large);

  @include media('mobile') {
    padding: var(--sp-medium);
  }
}

.footer {
  display           : flex;
  justify-content   : center;
  gap               : var(--sp-large);
  padding           : var(--sp-medium) var(--sp-large);
  border-block-start: 1px solid var(--light-border-color);

  @include media('mobile') {
    gap    : var(--sp-medium);
    padding: var(--sp-medium);

    > * {
      flex: 1 1 auto;
    }
  }
}

.close_button {
  inline-size: var(--icon-medium);
  block-size : var(--icon-medium);
  color      : var(--white);
  line-height: 1;
  cursor     : pointer;
  position   : absolute;
  bottom     : 100%;
  left       : 100%;

  > * {
    @include icon();
  }
}

.overlay {
  display              : flex;
  justify-content      : center;
  align-items          : center;
  inline-size          : 100dvw;
  block-size           : 100dvh;
  padding              : var(--sp-larger);
  background           : var(--overlay-color);
  background-blend-mode: multiply;
  backdrop-filter      : blur(4px);
  opacity              : 0;
  transition           : opacity .1s linear;
  pointer-events       : none;
  position             : fixed;
  z-index              : var(--z-index-overlay);
  top                  : 0;
  left                 : 0;
  cursor               : pointer;
  overflow             : hidden;

  @include media('mobile') {
    padding-inline: var(--sp-large);
  }

  &.display {
    opacity       : 1;
    pointer-events: auto;
    z-index       : calc(var(--z-index-nav) + 1);
  }
}
</style>