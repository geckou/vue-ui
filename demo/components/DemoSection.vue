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

    <div :class="[$style.preview, { [$style.contained]: contained }]">
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
  padding         : 1.5rem;
  border          : 1px solid var(--border-color);
  border-radius   : 10px;
  background-color: var(--white);
  scroll-margin-top: 5rem;
}

.header {
  display       : flex;
  flex-direction: column;
  gap           : .25rem;
}

.title {
  margin   : 0;
  font-size: 1.125rem;
}

.description {
  margin   : 0;
  color    : var(--gray);
  font-size: .875rem;
}

.preview {
  padding         : 1.5rem;
  border          : 1px dashed var(--border-color);
  border-radius   : 8px;
  background-color: var(--base-color);

  &.contained {
    container-type: inline-size;
  }
}

.toggle {
  margin-bottom   : .5rem;
  padding         : .35rem .8rem;
  border          : 1px solid var(--border-color);
  border-radius   : 999px;
  background-color: var(--white);
  color           : var(--text-color);
  font-size       : .8125rem;
  cursor          : pointer;

  &:hover {
    border-color: var(--primary-color);
    color       : var(--primary-color);
  }
}
</style>
