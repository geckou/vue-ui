# Geckou Vue UI Components
## Installation
```bash
npm install https://github.com/geckou/vue-ui-components.git
```
OR
```bash
yarn add https://github.com/geckou/vue-ui-components.git
```

## Usage
```javascript
import VueUiComponents from 'vue-ui-components'
```
OR
```javascript
import { GKTextBox } from 'vue-ui-components'
import { GKBasicButton } from 'vue-ui-components'
```

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

## Components
### `GKTextBox`

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
