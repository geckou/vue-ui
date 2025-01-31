<script lang="ts" setup>
import type {
  Validates,
  InputBoxStyleForEachStatus,
} from '@/types'
import {
  ref,
  watch,
} from 'vue'
import InputBox from '@/components/InputBox.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

type InputValue = string | null

const emit = defineEmits<{ (e: 'update:modelValue', newValue: InputValue): void }>()

const props = withDefaults(defineProps<{
  name: string
  modelValue?: InputValue
  cssStyle?: InputBoxStyleForEachStatus
  placeholder?: string
  isDisabled? : boolean
  isRequired?: boolean
  rows?: number
  maxLength?: number
  autocomplete?: string
  validates?: Validates
}>(), {
  modelValue  : undefined,
  cssStyle    : () => ({ default: {} }),
  isRequired  : false,
  placeholder : '入力してください',
  rows        : 3,
  maxLength   : 100,
  isDisabled  : false,
  autocomplete: 'off',
  validates   : () => [],
})

const inputValue = ref<InputValue>(props.modelValue ?? '')
const errorMessages = ref<Array<string>>([])

const validateValue = (value: InputValue) => {
  errorMessages.value = []
  if (!props.validates.length) return

  props.validates.forEach(validate => {
    if (!validate.regex.test(String(value))) errorMessages.value.push(validate.message)
  })
}

watch(() => props.modelValue, newValue => inputValue.value = newValue ?? '', { immediate: true })

watch(() => inputValue.value, newValue => {
  if (newValue === null) {
    errorMessages.value = []
    emit('update:modelValue', null)
    return
  }

  validateValue(newValue)
  if (props.modelValue !== undefined) emit('update:modelValue', newValue)
}, { immediate: !!props.modelValue })
</script>

<template>
  <InputBox
    :cssStyle="cssStyle"
    :class="$style.text_area"
  >
    <textarea
      v-model="inputValue"
      :required="isRequired"
      :name="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :autocomplete="autocomplete"
      :rows="rows"
      :maxlength="maxLength"
    />
    <ErrorMessage v-show="errorMessages.length" />
  </InputBox>
</template>

<style module>
.text_area {
  min-block-size: 4em;
}
</style>