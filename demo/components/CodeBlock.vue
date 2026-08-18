<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  code: string
  language?: string
}>(), {
  language: 'vue',
})

const copied = ref(false)

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1600)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.head">
      <span :class="$style.language">{{ language }}</span>
      <button
        type="button"
        :class="$style.copy"
        @click="copy"
      >
        {{ copied ? 'コピーしました' : 'コピー' }}
      </button>
    </div>
    <pre :class="$style.pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  overflow        : hidden;
  border          : 1px solid #2a2f3a;
  border-radius   : var(--radius-size);
  background-color: #1b1f27;
}

.head {
  display        : flex;
  align-items    : center;
  justify-content: space-between;
  padding        : .4rem .75rem;
  border-bottom  : 1px solid #2a2f3a;
  background-color: #232935;
}

.language {
  color         : #8a94a6;
  font-size     : .75rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.copy {
  padding         : .2rem .6rem;
  border          : 1px solid #39414f;
  border-radius   : 4px;
  background-color: transparent;
  color           : #c7d0de;
  font-size       : .75rem;
  cursor          : pointer;

  &:hover {
    background-color: #2c3341;
  }
}

.pre {
  overflow  : auto;
  margin    : 0;
  padding   : 1rem;
  color     : #d8dee9;
  font-size : .8125rem;
  line-height: 1.6;
  tab-size  : 2;
}
</style>
