<script setup lang="ts">
import type {
  Option,
  CheckBoxStyleForEachStatus,
} from '@/types'
import {
  ref,
  watch,
} from 'vue'
import LabeledCheckbox from '@/components/LabeledCheckbox.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const emit = defineEmits<{ (e: 'update:modelValue', newValue: string[]): void }>()

const props = withDefaults(defineProps<{
  name : string
  options: Array<Option>
  modelValue?: string[]
  isDisabled? : boolean
  isRequired?: boolean
  cssStyle?: CheckBoxStyleForEachStatus
}>(), {
  cssStyle: () => ({ default: {} }),
})

const checkedValues = ref<string[]>(props.modelValue || [])
const checkBoxes = ref<Array<{ value: string, label: string, checked: boolean }>>([])
const errorMessage = ref('')

const validateInput = (values: string[]) => errorMessage.value = !values.length && props.isRequired ? '必須項目です' : ''

const syncCheckBoxWithModelValue = () => {
  if (!props.modelValue) return
  
  checkBoxes.value = props.options.map(option => {
    const checked = props.modelValue?.includes(option.value) || false
    return { ...option, checked }
  })
}

watch(() => checkBoxes.value, newValue => {
  const values = newValue.map(checkBox => checkBox.checked ? checkBox.value : '').filter(Boolean)
  checkedValues.value = values
}, {
  deep: true,
})

watch(() => checkedValues.value, (newValue, oldValue) => {
  const arraysEqual = (a: Array<string>, b: Array<string>): boolean => {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false
    return true
  }

  if (oldValue && arraysEqual(newValue, oldValue)) return
  validateInput(newValue)
  emit('update:modelValue', newValue)
}, {
  deep     : true,
  immediate: !!props.modelValue?.length,
})

watch(() => [props.options, props.modelValue], _ => {
  syncCheckBoxWithModelValue()
}, {
  deep     : true,
  immediate: true,
})
</script>

<template>
  <div :class="$style.check_boxes">
    <template
      v-for="(option, index) in options"
      :key="option.label"
    >
      <label>
        <LabeledCheckbox
          v-model="checkBoxes[index].checked"
          :name="option.label"
          :label="option.label"
          :isDisabled="props.isDisabled"
          :cssStyle="props.cssStyle"
        />
      </label>
    </template>
    <ErrorMessage :errorMessage="errorMessage" />
  </div>
</template>

<style lang="scss" module>
.check_boxes {
  display  : flex;
  flex-wrap: wrap;
  gap      : 1rem 1.5rem;
  position : relative;
}
</style>
