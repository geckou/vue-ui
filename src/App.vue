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

const ALPHANUMERIC_REGEX = '^[a-zA-Z0-9_]+$'

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

const text = ref('')
const textarea = ref('')
const button = ref(false)
const select = ref('1')
const check = ref(false)
const checks = ref([])
const radios = ref('1')
const submit = e => {
  console.log('submit: ', e)
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h2>Form</h2>
      <LabeledFieldset>
        <template #label>
          テキストボックス
        </template>
        <TextBox
          v-model="text"
          type="email"
          name="textbox"
          :validates="[
            { regex: new RegExp(ALPHANUMERIC_REGEX), message: '半角英数字で入力してください' },
          ]"
        />
      </LabeledFieldset>
      <LabeledFieldset>
        <template #label>
          テキストエリア
        </template>
        <TextArea
          v-model="textarea"
          name="textarea"
        />
      </LabeledFieldset>
      <LabeledFieldset>
        <template #label>
          ボタン
        </template>
        <BasicButton @click="button = !button">
          BUTTON
        </BasicButton>
      </LabeledFieldset>
      <LabeledFieldset>
        <template #label>
          セレクトボックス
        </template>
        <SelectBox
          v-model="select"
          :options="SELECT_BOX_OPTIONS"
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
      <BasicButton type="submit">
        送信
      </BasicButton>
    </form>
    <div>
      <h2>Result</h2>
      <div>TextBox: {{ text }}</div>
      <div>TextArea: {{ textarea }}</div>
      <div>BasicButton: {{ button }}</div>
      <div>SelectBox: {{ select }}</div>
      <div>CheckBox: {{ check }}</div>
      <div>LabeledCheckbox: {{ check }}</div>
      <div>CheckBoxes: {{ checks }}</div>
      <div>RadioButtons: {{ radios }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display              : grid;
  grid-template-columns: 1fr 1fr;
  padding              : 2rem;

  > * {
    display       : flex;
    flex-direction: column;
    align-items   : flex-start;
    gap           : 2rem;
  }
}
</style>