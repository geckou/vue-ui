<script setup lang="ts">
import type { ListSettings } from '@/types'
import { computed, ref } from 'vue'
import DemoSection from '~demo/components/DemoSection.vue'
import CodeBlock from '~demo/components/CodeBlock.vue'
import LabeledCheckbox from '@/components/LabeledCheckbox.vue'
import SelectBox from '@/components/SelectBox.vue'
import { ARTICLES, ARTICLES_WITHOUT_IMAGE, CATEGORIES } from '~demo/data/articles'
import StandardList from '@/components/ArticleList/List/Standard.vue'
import RoundedList from '@/components/ArticleList/List/Rounded.vue'
import ArtisticList from '@/components/ArticleList/List/Artistic.vue'
import TileList from '@/components/ArticleList/List/Tile.vue'
import SimpleList from '@/components/ArticleList/List/Simple.vue'
import RowList from '@/components/ArticleList/List/Row.vue'
import NewsList from '@/components/ArticleList/List/News.vue'
import EntertainmentList from '@/components/ArticleList/List/Entertainment.vue'
import GalleryList from '@/components/ArticleList/List/Gallery.vue'
import GridList from '@/components/ArticleList/List/Grid.vue'

type ListDefinition = {
  key: string
  name: string
  component: any
  description: string
  needsColumnNumber?: boolean
}

const LISTS: ListDefinition[] = [
  { key: 'standard', name: 'StandardList', component: StandardList, description: 'サムネイル・見出し・抜粋・メタ情報を揃えた標準レイアウト。3 カラム。' },
  { key: 'rounded', name: 'RoundedList', component: RoundedList, description: '角丸のカードで柔らかい印象に。ブログや読み物向け。' },
  { key: 'artistic', name: 'ArtisticList', component: ArtisticList, description: '画像を大きく見せる構成。ビジュアル主体のメディア向け。' },
  { key: 'tile', name: 'TileList', component: TileList, description: '画像の上にテキストを重ねるタイル型。' },
  { key: 'simple', name: 'SimpleList', component: SimpleList, description: '装飾を抑えた最小構成。サイドバーや関連記事に。' },
  { key: 'row', name: 'RowList', component: RowList, description: '横並びの 1 行レイアウト。検索結果や一覧ページ向け。' },
  { key: 'news', name: 'NewsList', component: NewsList, description: '日付とカテゴリを前面に出したニュース向け。' },
  { key: 'entertainment', name: 'EntertainmentList', component: EntertainmentList, description: '賑やかな見せ方。エンタメ・キャンペーン系に。' },
  { key: 'gallery', name: 'GalleryList', component: GalleryList, description: '画像を敷き詰めるギャラリー表示。' },
  { key: 'grid', name: 'GridList', component: GridList, description: 'カードごとに大きさと向きが変わるグリッド。columnNumber が必須。', needsColumnNumber: true },
]

const isEnabledPickUp = ref(true)
const useAuthor = ref(true)
const useCategory = ref(true)
const useTag = ref(true)
const hasImage = ref(true)
const columnNumber = ref('3')

const COLUMN_OPTIONS = [
  { label: '2 カラム', value: '2' },
  { label: '3 カラム', value: '3' },
  { label: '4 カラム', value: '4' },
]

const articles = computed(() => hasImage.value ? ARTICLES : ARTICLES_WITHOUT_IMAGE)

const settings = computed<ListSettings>(() => ({
  domainToUse: 'example.com',
  postConfig : {
    article_page_path: '/article/',
    query_key_name   : 'article',
    useAuthor        : useAuthor.value,
    useCategory      : useCategory.value,
    useTag           : useTag.value,
  },
  isEnabledPickUp: isEnabledPickUp.value,
}))

const SETUP_CODE = `<script setup lang="ts">
import type { Category, ListSettings } from '@geckou/vue-ui'
import { ref, onMounted } from 'vue'
import { StandardList } from '@geckou/vue-ui'

const settings: ListSettings = {
  domainToUse: 'example.com',
  postConfig : {
    article_page_path: '/article/',
    query_key_name   : 'article',
    useAuthor        : true,
    useCategory      : true,
    useTag           : true,
  },
  isEnabledPickUp: true, // 先頭記事をピックアップ表示にする
}

const categories: Category[] = [
  { id: '1', name: 'デザイン' },
  { id: '2', name: 'エンジニアリング' },
]

const articles = ref<any[]>([])

onMounted(async () => {
  // WordPress REST API のレスポンス（_embed 付き）をそのまま渡せる
  const res = await fetch('https://example.com/wp-json/wp/v2/posts?_embed')
  articles.value = await res.json()
})
<\/script>

<template>
  <StandardList
    :articles="articles"
    :categories="categories"
    :settings="settings"
  />
<\/template>`

const listCode = (definition: ListDefinition) => definition.needsColumnNumber
  ? `<${definition.name}
  :articles="articles"
  :categories="categories"
  :settings="settings"
  :columnNumber="${columnNumber.value}"
/>`
  : `<${definition.name}
  :articles="articles"
  :categories="categories"
  :settings="settings"
/>`
</script>

<template>
  <div :class="$style.page">
    <section :class="$style.intro">
      <h3 :class="$style.introTitle">記事一覧コンポーネント</h3>
      <p :class="$style.introText">
        WordPress REST API（<code>?_embed</code> 付き）のレスポンス配列をそのまま <code>articles</code> に渡すだけで一覧が組み上がります。
        レイアウトは 10 種類。<code>settings.isEnabledPickUp</code> を有効にすると先頭の記事だけ大きく表示されます。
        以下のデモはモックデータで動作しています。
      </p>
      <CodeBlock :code="SETUP_CODE" />
    </section>

    <section :class="$style.controls">
      <p :class="$style.controlsTitle">表示オプション</p>
      <div :class="$style.controlsBody">
        <LabeledCheckbox
          v-model="isEnabledPickUp"
          name="pickup"
          label="ピックアップ表示"
        />
        <LabeledCheckbox
          v-model="useAuthor"
          name="author"
          label="著者"
        />
        <LabeledCheckbox
          v-model="useCategory"
          name="category"
          label="カテゴリ"
        />
        <LabeledCheckbox
          v-model="useTag"
          name="tag"
          label="タグ"
        />
        <LabeledCheckbox
          v-model="hasImage"
          name="image"
          label="アイキャッチあり"
        />
        <div :class="$style.select">
          <SelectBox
            v-model="columnNumber"
            name="columnNumber"
            :options="COLUMN_OPTIONS"
            canOmitSelect
          />
          <span :class="$style.selectNote">GridList のカラム数</span>
        </div>
      </div>
    </section>

    <DemoSection
      v-for="definition in LISTS"
      :key="definition.key"
      :id="definition.key"
      :title="definition.name"
      :description="definition.description"
      :code="listCode(definition)"
      contained
    >
      <component
        :is="definition.component"
        :articles="articles"
        :categories="CATEGORIES"
        :settings="settings"
        v-bind="definition.needsColumnNumber ? { columnNumber: Number(columnNumber) } : {}"
      />
    </DemoSection>
  </div>
</template>

<style lang="scss" module>
.page {
  display       : flex;
  flex-direction: column;
  gap           : 1.5rem;
}

.intro {
  display         : flex;
  flex-direction  : column;
  gap             : .75rem;
  padding         : var(--sp-large);
  border          : 1px solid var(--border-color);
  border-radius   : var(--radius-size);
  background-color: var(--surface-color);
}

.introTitle {
  margin        : 0;
  font-size     : var(--fs-large);
  font-weight   : 500;
  letter-spacing: var(--letter-spacing-normal);
}

.introText {
  margin     : 0;
  color      : var(--gray);
  font-size  : var(--fs-small);
  line-height: var(--line-height-normal);

  code {
    padding         : .1em .4em;
    border-radius   : 4px;
    background-color: var(--sub-color);
    color           : var(--primary-color);
  }
}

.controls {
  position        : sticky;
  top             : 0;
  z-index         : 10;
  display         : flex;
  flex-direction  : column;
  gap             : .5rem;
  padding         : var(--sp-medium) var(--sp-large);
  border          : 1px solid var(--border-color);
  border-radius   : var(--radius-size);
  background-color: color-mix(in srgb, var(--base-color) 90%, transparent);
  backdrop-filter : blur(8px);
}

.controlsTitle {
  margin        : 0;
  color         : var(--gray);
  font-size     : var(--fs-min);
  letter-spacing: var(--letter-spacing-normal);
}

.controlsBody {
  display    : flex;
  align-items: center;
  flex-wrap  : wrap;
  gap        : 1rem;
}

.select {
  display    : flex;
  align-items: center;
  gap        : .5rem;
  min-width  : 16rem;
}

.selectNote {
  color      : var(--gray);
  font-size  : var(--fs-min);
  white-space: nowrap;
}
</style>
