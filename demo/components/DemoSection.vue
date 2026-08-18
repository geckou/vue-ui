<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '~demo/components/CodeBlock.vue'

const props = withDefaults(defineProps<{
  id?: string
  title: string
  description?: string
  code?: string
  contained?: boolean
}>(), {
  id         : undefined,
  description: '',
  code       : '',
  contained  : false,
})

const isCodeOpen = ref(false)
</script>

<template>
  <section
    :id="id"
    :class="$style.section"
  >
    <header :class="$style.header">
      <h3 :class="$style.title">{{ title }}</h3>
      <p
        v-if="description"
        :class="$style.description"
      >
        {{ description }}
      </p>
    </header>

    <div :class="['demo-preview', $style.preview, { [$style.contained]: contained }]">
      <slot />
    </div>

    <div v-if="code">
      <button
        type="button"
        :class="$style.toggle"
        @click="isCodeOpen = !isCodeOpen"
      >
        {{ isCodeOpen ? 'コードを隠す' : 'コードを見る' }}
      </button>
      <CodeBlock
        v-if="isCodeOpen"
        :code="code"
      />
    </div>
  </section>
</template>

<style lang="scss" module>
.section {
  display         : flex;
  flex-direction  : column;
  gap             : 1rem;
  padding         : var(--sp-large);
  border          : 1px solid var(--border-color);
  border-radius   : var(--radius-size);
  background-color: var(--surface-color);
  scroll-margin-top: 5rem;
}

.header {
  display       : flex;
  flex-direction: column;
  gap           : .25rem;
}

.title {
  margin        : 0;
  font-size     : var(--fs-large);
  font-weight   : 500;
  letter-spacing: var(--letter-spacing-normal);
  line-height   : var(--line-height-narrow);
}

.description {
  margin     : 0;
  color      : var(--gray);
  font-size  : var(--fs-small);
  line-height: var(--line-height-narrow);
}

.preview {
  padding         : var(--sp-large);
  border          : 1px solid var(--light-border-color);
  border-radius   : var(--radius-size);
  background-color: var(--surface-muted);

  &.contained {
    container-type: inline-size;
  }
}

.toggle {
  margin-bottom   : .5rem;
  padding         : .35rem .9rem;
  border          : 1px solid var(--border-color);
  border-radius   : 999px;
  background-color: transparent;
  color           : var(--text-color);
  font-family     : inherit;
  font-size       : var(--fs-smaller);
  letter-spacing  : var(--letter-spacing-narrow);
  cursor          : pointer;

  &:hover {
    border-color: var(--primary-color);
    color       : var(--primary-color);
  }
}
</style>
