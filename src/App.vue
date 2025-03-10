<script lang="ts" setup>
import { ref } from 'vue'
import LabeledFieldset from './components/LabeledFieldset.vue'
import TextBox from './components/TextBox.vue'
import TextArea from './components/TextArea.vue'
import BasicButton from './components/BasicButton.vue'
import SelectBox from './components/SelectBox.vue'
import CheckBox from './components/CheckBox.vue'
import LabeledCheckbox from './components/LabeledCheckbox.vue'
import CheckBoxes from './components/CheckBoxes.vue'
import RadioButtons from './components/RadioButtons.vue'
import ToggleButton from './components/ToggleButton.vue'
import TabUI from './components/TabUI.vue'

const ALPHANUMERIC_REGEX = '^[a-zA-Z_]+$'

const SELECT_BOX_OPTIONS = [
  { label: '選択肢1', value: '1' },
  { label: '選択肢2', value: '2' },
  { label: '選択肢3', value: '3' },
  {
    '選択肢4': [
      { label: '選択肢4-1', value: '4-1' },
      { label: '選択肢4-2', value: '4-2' },
      { label: '選択肢4-3', value: '4-3' },
    ],
  },
  {
    '選択肢5': [
      { label: '選択肢5-1', value: '5-1' },
      { label: '選択肢5-2', value: '5-2' },
      { label: '選択肢5-3', value: '5-3' },
    ],
  },
]

const CHECKBOXES_OPTIONS = [
  { label: '選択肢1', value: '1' },
  { label: '選択肢2', value: '2' },
  { label: '選択肢3', value: '3' },
]

const VALIDATES = [
  { regex: new RegExp(ALPHANUMERIC_REGEX), message: '半角英字で入力してください' },
]

const text = ref('')
const textarea = ref('')
const select = ref('')
const check = ref(false)
const checks = ref([])
const radios = ref('1')
const toggle = ref(false)
const submit = e => console.log('submit: ', e)
</script>

<template>
  <div class="container">
    <h1>Geckou Vue UI</h1>
    <TabUI
      :tabs="[
        { key: 'tabA', label: 'Form' },
        { key: 'tabB', label: 'Results' },
      ]"
    >
      <template #tabAContents>
        <form @submit.prevent="submit">
          <LabeledFieldset>
            <template #label>
              テキストボックス
            </template>
            <TextBox
              v-model="text"
              name="textbox"
              :validates="VALIDATES"
              isRequired
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              テキストエリア
            </template>
            <TextArea
              v-model="textarea"
              name="textarea"
              :validates="VALIDATES"
              autoAdjustHeight
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              セレクトボックス
            </template>
            <SelectBox
              v-model="select"
              :options="SELECT_BOX_OPTIONS"
              isRequired
              name="selectBox"
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              チェックボックス
            </template>
            <CheckBox
              v-model="check"
              name="checkbox"
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              ラベル付きチェックボックス
            </template>
            <LabeledCheckbox
              v-model="check"
              label="ラベル"
              name="labeledCheckbox"
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              チェックボックス群
            </template>
            <CheckBoxes
              v-model="checks"
              :options="CHECKBOXES_OPTIONS"
              name="checkboxes"
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              ラジオボタン
            </template>
            <RadioButtons
              v-model="radios"
              :options="[
                { label: '選択肢1', value: '1' },
                { label: '選択肢2', value: '2' },
                { label: '選択肢3', value: '3' },
              ]"
            />
          </LabeledFieldset>
          <LabeledFieldset>
            <template #label>
              トグルボタン
            </template>
            <ToggleButton
              v-model="toggle"
              name="toggleButton"
            />
          </LabeledFieldset>
          <BasicButton type="submit">
            送信
          </BasicButton>
        </form>
      </template>
      <template #tabBContents>
        <h2>Results</h2>
        <div>
          <div>TextBox: {{ text }}</div>
          <div>TextArea: {{ textarea }}</div>
          <div>SelectBox: {{ select }}</div>
          <div>CheckBox: {{ check }}</div>
          <div>LabeledCheckbox: {{ check }}</div>
          <div>CheckBoxes: {{ checks }}</div>
          <div>RadioButtons: {{ radios }}</div>
          <div>ToggleButton: {{ toggle }}</div>
        </div>
      </template>
    </TabUI>
  </div>
</template>

<style lang="scss">
.container {
  padding: 2rem;

  h2 {
    margin: 0;
  }

  form {
    display       : flex;
    flex-direction: column;
    align-items   : flex-start;
    gap           : 2rem;

    > * {
      inline-size: 50%;
    }
  }
}
</style>