<script setup lang="ts">
import CodeBlock from '~demo/components/CodeBlock.vue'

const NPMRC = `@geckou:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`

const INSTALL = `# GitHub Packages 経由
yarn add @geckou/vue-ui

# もしくはリポジトリ直指定
yarn add https://github.com/geckou/vue-ui.git`

const PLUGIN_USAGE = `import { createApp } from 'vue'
import GeckouVueUi from '@geckou/vue-ui'
import App from './App.vue'

createApp(App)
  .use(GeckouVueUi) // TextBox / StandardList などがグローバル登録される
  .mount('#app')`

const NAMED_USAGE = `<script setup lang="ts">
import { TextBox, StandardList } from '@geckou/vue-ui'
<\/script>`

const CSS_VARS = `:root {
  --primary-color: #1f7a6c;
  --main-color   : #1f7a6c;
  --text-color   : #222;
  --gray         : #8a8f98;
  --white        : #fff;
  --border-color : #e5e5e5;

  --bv           : 8px;            /* 基準値 */
  --sp-min       : calc(var(--bv) / 2);
  --sp-small     : var(--bv);
  --sp-medium    : calc(var(--bv) * 2);
  --sp-large     : calc(var(--bv) * 4);
  --sp-larger    : calc(var(--bv) * 8);
}`
</script>

<template>
  <div :class="$style.page">
    <section :class="$style.hero">
      <p :class="$style.eyebrow">@geckou/vue-ui</p>
      <h2 :class="$style.title">フォーム UI と記事一覧 UI を、ひとつのパッケージで</h2>
      <p :class="$style.lead">
        Geckou のプロダクトで使い回している Vue 3 コンポーネント集です。
        入力フォーム系のコンポーネントと、WordPress REST API の記事データをそのまま渡せる記事一覧コンポーネント（10 レイアウト）を収録しています。
        旧 <code>@geckou/vue-article-list</code> は本パッケージに統合されました。
      </p>
    </section>

    <section :class="$style.block">
      <h3 :class="$style.heading">インストール</h3>
      <p :class="$style.text">
        GitHub Packages で配布しています。プロジェクトルートの <code>.npmrc</code> にレジストリを設定してください。
      </p>
      <CodeBlock
        :code="NPMRC"
        language="npmrc"
      />
      <CodeBlock
        :code="INSTALL"
        language="bash"
      />
    </section>

    <section :class="$style.block">
      <h3 :class="$style.heading">使い方</h3>
      <p :class="$style.text">プラグインとして一括登録するか、必要なコンポーネントだけ名前付きインポートします。</p>
      <CodeBlock :code="PLUGIN_USAGE" language="ts" />
      <CodeBlock :code="NAMED_USAGE" />
    </section>

    <section :class="$style.block">
      <h3 :class="$style.heading">スタイルの前提</h3>
      <p :class="$style.text">
        各コンポーネントは CSS カスタムプロパティで配色と余白を受け取ります。
        アプリ側のグローバル CSS で以下の変数を定義しておくと、そのままプロダクトのトーンに馴染みます。
      </p>
      <CodeBlock :code="CSS_VARS" language="css" />
    </section>

    <section :class="$style.block">
      <h3 :class="$style.heading">収録コンポーネント</h3>
      <div :class="$style.cards">
        <article :class="$style.card">
          <h4 :class="$style.cardTitle">Form</h4>
          <p :class="$style.cardText">
            TextBox / TextArea / SelectBox / CheckBox / CheckBoxes / LabeledCheckbox /
            RadioButtons / ToggleButton / BasicButton / LabeledFieldset / TabUI ほか
          </p>
        </article>
        <article :class="$style.card">
          <h4 :class="$style.cardTitle">Article List</h4>
          <p :class="$style.cardText">
            StandardList / RoundedList / ArtisticList / TileList / SimpleList /
            RowList / NewsList / EntertainmentList / GalleryList / GridList
          </p>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" module>
.page {
  display       : flex;
  flex-direction: column;
  gap           : 2rem;
}

.hero {
  padding         : 2rem;
  border-radius   : 12px;
  background      : linear-gradient(135deg, #1f7a6c, #2b4c7e);
  color           : var(--white);
}

.eyebrow {
  margin        : 0 0 .5rem;
  font-size     : .8125rem;
  letter-spacing: .12em;
  opacity       : .8;
}

.title {
  margin   : 0 0 .75rem;
  font-size: clamp(1.4rem, 1rem + 1.6vw, 2rem);
}

.lead {
  max-width: 46rem;
  margin   : 0;
  font-size: .9375rem;
  opacity  : .92;

  code {
    padding         : .1em .4em;
    border-radius   : 4px;
    background-color: rgba(255, 255, 255, .18);
  }
}

.block {
  display         : flex;
  flex-direction  : column;
  gap             : .75rem;
  padding         : 1.5rem;
  border          : 1px solid var(--border-color);
  border-radius   : 10px;
  background-color: var(--white);
}

.heading {
  margin   : 0;
  font-size: 1.125rem;
}

.text {
  margin   : 0;
  color    : var(--gray);
  font-size: .875rem;

  code {
    padding         : .1em .4em;
    border-radius   : 4px;
    background-color: var(--sub-color);
    color           : var(--primary-color);
  }
}

.cards {
  display              : grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap                  : 1rem;
}

.card {
  padding         : 1rem;
  border          : 1px solid var(--border-color);
  border-radius   : 8px;
  background-color: var(--base-color);
}

.cardTitle {
  margin   : 0 0 .35rem;
  font-size: .9375rem;
  color    : var(--primary-color);
}

.cardText {
  margin   : 0;
  color    : var(--gray);
  font-size: .8125rem;
  word-break: break-word;
}
</style>
