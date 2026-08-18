<script setup lang="ts">
import type {
  Category,
  ListSettings,
} from '@/types'
import GenericArticleList from '@/components/ArticleList/GenericArticleList.vue'

const props = defineProps<{
  articles: any[]
  categories: Category[]
  settings: ListSettings
}>()
</script>

<template>
  <GenericArticleList
    theme="row"
    :columnNumber="1"
    :articles="articles"
    :categories="categories"
    :settings="settings"
  />
</template>