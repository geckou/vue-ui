# Geckou Vue UI Components

Vue 3 用の再利用可能な UI コンポーネント集。入力フォーム系のコンポーネントと、WordPress REST API の記事データをそのまま渡せる記事一覧コンポーネント（10 レイアウト）を収録しています。

**デモサイト: https://geckou.github.io/vue-ui/**

## Installation

`.npmrc`

```
@geckou:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
yarn add @geckou/vue-ui
# もしくは
yarn add https://github.com/geckou/vue-ui.git
```

## Usage

```ts
import { createApp } from 'vue'
import GeckouVueUi from '@geckou/vue-ui'
import App from './App.vue'

createApp(App).use(GeckouVueUi).mount('#app')
```

```ts
// 個別インポート
import { TextBox, StandardList } from '@geckou/vue-ui'
```

## Components

### Form

`TextBox` / `TextArea` / `SelectBox` / `CheckBox` / `CheckBoxes` / `CheckButton` /
`LabeledCheckbox` / `LabeledFieldset` / `RadioButtons` / `ToggleButton` / `BasicButton` /
`TextButton` / `InputBox` / `InputGroup` / `TabUI` / `SlideDownUi` / `DropdownUi` /
`ModalBox` / `PopupBox` / `LoadingSpinner` / `ErrorMessage`

### Date

`DatePicker` / `DateRangePicker` / `DateSelector`

`FormValidationManager` を渡すと、フォーム内の各入力の検証結果をまとめて追跡できます。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker, DateRangePicker, FormValidationManager } from '@geckou/vue-ui'

const manager = new FormValidationManager()
const startedOn = ref('')
const period = ref({ start: '', end: '' })
// manager.isAllValid.value / manager.invalidNames.value で状態を参照する
</script>

<template>
  <DatePicker
    v-model="startedOn"
    name="startedOn"
    :formValidationManager="manager"
    isRequired
  />
  <DateRangePicker
    v-model="period"
    name="period"
  />
  <button :disabled="!manager.isAllValid.value">送信</button>
</template>
```

| Component | modelValue | 主な props |
|-----------|-----------|-----------|
| `DatePicker` | `string`（`YYYY-MM-DD` / `type="month"` なら `YYYY-MM`） | `name` / `isRequired` / `isDisabled` / `minDate` / `maxDate` / `size` / `type` / `formValidationManager` |
| `DateRangePicker` | `{ start: string; end: string }` | `DatePicker` と同じ（開始日と終了日の min / max が自動連動） |
| `DateSelector` | `string`（`YYYY-MM-DD`） | `name` / `isRequired` / `type` / `formValidationManager` |

### Article List

`StandardList` / `RoundedList` / `ArtisticList` / `TileList` / `SimpleList` /
`RowList` / `NewsList` / `EntertainmentList` / `GalleryList` / `GridList`

WordPress REST API（`?_embed` 付き）のレスポンス配列をそのまま渡せます。

```vue
<script setup lang="ts">
import type { Category, ListSettings } from '@geckou/vue-ui'
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
  isEnabledPickUp: true,
}

const categories: Category[] = [{ id: '1', name: 'デザイン' }]
const articles = ref<any[]>([])
</script>

<template>
  <StandardList
    :articles="articles"
    :categories="categories"
    :settings="settings"
  />
</template>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articles` | `any[]` | ✅ | WordPress REST API のレスポンス配列 |
| `categories` | `Category[]` | ✅ | カテゴリ ID と表示名の対応 |
| `settings` | `ListSettings` | ✅ | 記事リンクの組み立て設定と表示オプション |
| `columnNumber` | `number` | `GridList` のみ ✅ | グリッドのカラム数 |

## Design tokens

各コンポーネントは配色・余白・タイポグラフィを CSS カスタムプロパティで受け取ります。
アプリ側のグローバル CSS で定義してください（未定義でも動作しますが、色や余白が効きません）。

以下は [geckou.net](https://geckou.net/) のブランドカラーに合わせた例で、デモサイトも同じトークンで組んでいます。

```css
:root {
  /* 配色 */
  --primary-color: #1c4ac9;  /* 見出し・リンク・フォーカス */
  --main-color   : #1c4ac9;  /* カテゴリラベルなどの塗り */
  --link-color   : #1c4ac9;
  --checked-color: #1c4ac9;  /* チェックボックス・ラジオの選択色 */
  --text-color   : #15143a;
  --gray         : #656a7d;  /* 補助テキスト */
  --white        : #fff;     /* 画像上の文字色などに使用 */
  --black-rgb    : 0, 8, 26; /* 影の生成に使用 */
  --border-color : rgba(21, 20, 58, .12);
  --light-border-color: rgba(21, 20, 58, .08);
  --disable-text-color: #656a7d;

  /* 余白（--bv を基準値にした 5 段階） */
  --bv       : clamp(.375rem, .144rem + .46vw, .5rem);
  --sp       : var(--bv);
  --sp-min   : calc(var(--sp) / 2);
  --sp-small : var(--sp);
  --sp-medium: calc(var(--sp) * 2);
  --sp-large : calc(var(--sp) * 4);
  --sp-larger: calc(var(--sp) * 8);

  /* タイポグラフィ */
  --fs-small: clamp(.75rem, .519rem + .46vw, .875rem);
  --fs-large: clamp(1rem, .769rem + .46vw, 1.125rem);

  /* アイコン・角丸・アニメーション */
  --icon-small        : calc(var(--bv) * 2);
  --icon-medium       : calc(var(--bv) * 3);
  --radius-size       : 4px;
  --radius-small      : 4px;
  --animation-duration: .3s;
}
```

| 変数 | 用途 |
|------|------|
| `--primary-color` / `--main-color` / `--link-color` | ブランドカラー。見出し、リンク、カテゴリラベルの塗り |
| `--text-color` / `--gray` / `--disable-text-color` | 本文・補助テキスト・非活性テキスト |
| `--white` / `--black-rgb` | 画像上の文字色、影の生成 |
| `--border-color` / `--light-border-color` | 枠線 |
| `--bv` と `--sp-*` | 余白の基準値と段階 |
| `--fs-small` / `--fs-large` | 小さめ・大きめの文字サイズ |

記事一覧コンポーネントはコンテナクエリでレイアウトを切り替えるため、
親要素に `container-type: inline-size` を指定してください。

フォーム系コンポーネントは、個別に `cssStyle` prop（`InputBoxStyleForEachStatus` など）を渡すと
状態ごとの配色を上書きできます。詳細は下の Types を参照してください。

デモサイトは geckou.net のトンマナ（ダークネイビー `#15143a` 系、ブルー `#1c4ac9`、Zen Kaku Gothic Antique、
`--bv` 起点のクランプスケール）に揃えており、OS の配色設定に応じてライト / ダークが切り替わります。

## Development

```bash
yarn install
yarn dev          # デモサイトを起動（http://localhost:5555/vue-ui/）
yarn build        # 配布用 dist を生成
yarn build:demo   # デモサイトを demo-dist に出力
```

デモサイトは `main` への push で GitHub Pages に自動デプロイされます（`.github/workflows/deploy-demo.yml`）。

## Types

### `BorderStyle`

| Prop Name           | Type            | Required | Description                                                |
|---------------------|-----------------|----------|------------------------------------------------------------|
| `color`             | `string`        | ✅       | ボーダーの色                                               |
| `size`              | `string`        | ✅       | ボーダーの太さ                                             |
| `radius`            | `string`        | ✅       | 角丸の大きさ                                               |

### `InputBoxStyle`

| Prop Name           | Type            | Required | Description                                                |
|---------------------|-----------------|----------|------------------------------------------------------------|
| `textColor`         | `string`        | ❌       | テキストの色                                               |
| `placeholderColor`  | `string`        | ❌       | プレスホルダーの色                                         |
| `border`            | `BorderStyle`   | ❌       | ボーダーのスタイル                                         |
| `backgroundColor`   | `string`        | ❌       | 背景色                                                     |
| `boxShadow`         | `string`        | ❌       | 影のスタイル                                               |

### `InputBoxStyleForEachStatus`

| Prop Name | Type                   | Required | Description                                                |
|-----------|------------------------|----------|------------------------------------------------------------|
| `default` | `InputBoxStyle`        | ✅       | デフォルトのスタイル                                        |
| `error`   | `InputBoxStyle`        | ❌       | エラー時のスタイル                                         |
| `disabled`| `InputBoxStyle`        | ❌       | 非活性時のスタイル                                         |
| `valid`   | `InputBoxStyle`        | ❌       | 入力した値が有効な時のスタイル                             |
| `focus`   | `InputBoxStyle`        | ❌       | フォーカス時のスタイル                                     |

### `ButtonStyle`

| Prop Name          | Type            | Required | Description                                                |
|--------------------|-----------------|----------|------------------------------------------------------------|
| `textColor`        | `string`        | ❌       | Specifies the button text color.                          |
| `border`           | `BorderStyle`   | ❌       | Defines the border style for the button.                  |
| `backgroundColor`  | `string`        | ❌       | Specifies the button's background color.                  |
| `backgroundImage`  | `string`        | ❌       | Specifies the background image or gradient.               |
| `boxShadow`        | `string`        | ❌       | Specifies the box shadow for the button.                  |

### `ButtonStyleForEachStatus`

| Prop Name | Type            | Required | Description                                                |
|-----------|-----------------|----------|------------------------------------------------------------|
| `default` | `ButtonStyle`   | ✅      | The style applied in the default state.                   |
| `hover`   | `ButtonStyle`   | ❌       | The style applied when the button is hovered.             |
| `disabled`| `ButtonStyle`   | ❌       | The style applied when the button is disabled.            |

### `CheckBoxStyle`

| Prop Name          | Type            | Required | Description                                                |
|--------------------|-----------------|----------|------------------------------------------------------------|
| `border`           | `BorderStyle`   | ❌       | Defines the border style for the checkbox.                |
| `backgroundColor`  | `string`        | ❌       | Specifies the background color for the checkbox.          |

### `CheckBoxStyleForEachStatus`

| Prop Name | Type             | Required | Description                                                |
|-----------|------------------|----------|------------------------------------------------------------|
| `default` | `CheckBoxStyle`  | ✅      | The style applied in the default state.                   |
| `disabled`| `CheckBoxStyle`  | ❌       | The style applied when the checkbox is disabled.          |

### `RadioButtonStyle`

| Prop Name          | Type                           | Required | Description                                                |
|--------------------|--------------------------------|----------|------------------------------------------------------------|
| `border`           | `Omit<BorderStyle, 'radius'>` | ❌       | Defines the border style without a border radius.         |
| `backgroundColor`  | `string`                      | ❌       | Specifies the background color for the radio button.      |

### `RadioButtonStyleForEachStatus`

| Prop Name | Type                 | Required | Description                                                |
|-----------|----------------------|----------|------------------------------------------------------------|
| `default` | `RadioButtonStyle`   | ✅      | The style applied in the default state.                   |
| `disabled`| `RadioButtonStyle`   | ❌       | The style applied when the radio button is disabled.      |

### `Validates`

| Prop Name  | Type       | Required | Description                                                |
|------------|------------|----------|------------------------------------------------------------|
| `regex`    | `RegExp`   | ✅      | The regular expression used for validation.               |
| `message`  | `string`   | ✅      | The error message displayed when validation fails.        |

### `Category`

| Prop Name | Type     | Required | Description                    |
|-----------|----------|----------|--------------------------------|
| `id`      | `string` | ✅       | WordPress のカテゴリ ID        |
| `name`    | `string` | ✅       | 表示するカテゴリ名             |

### `PostConfig`

| Prop Name           | Type      | Required | Description                                          |
|---------------------|-----------|----------|------------------------------------------------------|
| `article_page_path` | `string`  | ✅       | 記事詳細ページのパス                                 |
| `query_key_name`    | `string`  | ✅       | 記事 ID を渡すクエリキー                             |
| `useAuthor`         | `boolean` | ❌       | 著者を表示するか                                     |
| `useCategory`       | `boolean` | ❌       | カテゴリを表示するか                                 |
| `useTag`            | `boolean` | ❌       | タグを表示するか                                     |

### `ListSettings`

| Prop Name         | Type         | Required | Description                                |
|-------------------|--------------|----------|--------------------------------------------|
| `domainToUse`     | `string`     | ✅       | 記事リンクに使うドメイン                   |
| `postConfig`      | `PostConfig` | ✅       | 記事詳細ページの組み立て設定               |
| `isEnabledPickUp` | `boolean`    | ✅       | 先頭の記事を大きく表示するか               |

## Component Props (Form)
### `TextBox`

| Prop Name          | Type                        | Required | Default            | Description                                    |
|--------------------|-----------------------------|----------|--------------------|------------------------------------------------|
| `modelValue`       | `string \| number`          | ✅       | -                  | テキストボックスの値                           |
| `name`             | `string`                    | ✅       | -                  | `name`属性                                     |
| `cssStyle`         | `InputBoxStyleForEachStatus`| ❌       | -                  | テキストボックスのスタイル                     |
| `type`             | `string`                    | ❌       | `text`             | テキストボックスのタイプ                       |
| `isDisabled`       | `boolean`                   | ❌       | `false`            | テキストボックスの活性/非活性                  |
| `isRequired`       | `boolean`                   | ❌       | `false`            | 必須項目かどうか                               |
| `maxLength`        | `number`                    | ❌       | `30`               | 最大入力文字数                                 |
| `autocomplete`     | `string`                    | ❌       | `off`              | `autocomplete`属性                             |
| `validates`        | `Validates[]`               | ❌       | `[]`               | バリデーションの設定                           |
