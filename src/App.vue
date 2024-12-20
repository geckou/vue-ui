<script lang="ts" setup>
import { ref } from 'vue'
import TextBox from '@/components/TextBox.vue'
import TextArea from '@/components/TextArea.vue'
import BasicButton from '@/components/BasicButton.vue'
import SelectBox from '@/components/SelectBox.vue'
import CheckBox from '@/components/CheckBox.vue'
import RadioButtons from '@/components/RadioButtons.vue'

const text = ref('')
const textarea = ref('')
const button = ref(false)
const select = ref('1')
const check = ref(false)
const radios = ref('1')
</script>

<template>
  <div>
    <TextBox
      v-model="text"
      name="textbox"
    />
    <div>TextBox: {{ text }}</div>
    <TextArea
      v-model="textarea"
      name="textarea"
    />
    <div>TextArea: {{ textarea }}</div>
    <BasicButton @click="button = !button">
      BUTTON
    </BasicButton>
    <div>BasicButton: {{ button }}</div>
    <SelectBox
      v-model="select"
      :options="[
        { label: '選択肢1', value: '1' },
        { label: '選択肢2', value: '2' },
        { label: '選択肢3', value: '3' },
      ]"
      name="selectBox"
    />
    <div>SelectBox: {{ select }}</div>
    <CheckBox
      v-model="check"
      name="checkbox"
    />
    <div>CheckBox: {{ check }}</div>
    <RadioButtons
      v-model="radios"
      :options="[
        { label: '選択肢1', value: '1' },
        { label: '選択肢2', value: '2' },
        { label: '選択肢3', value: '3' },
      ]"
    />
    <div>RadioButtons: {{ radios }}</div>
  </div>
</template>