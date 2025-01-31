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

type InputValue = string | number
const emit = defineEmits<{ (e: 'update:modelValue', newValue: InputValue): void }>()

const props = withDefaults(defineProps<{
  name: string
  modelValue?: InputValue
  cssStyle?: InputBoxStyleForEachStatus | undefined
  type? : string
  placeholder?: string
  isDisabled? : boolean
  isRequired?: boolean
  maxLength?: number
  autocomplete?: string
  validates?: Validates
}>(), {
  modelValue  : undefined,
  cssStyle    : undefined,
  type        : 'text',
  placeholder : '入力してください',
  maxLength   : 30,
  autocomplete: 'off',
  validates   : () => [],
})

const inputValue = ref<InputValue>(props.modelValue ?? '')
const errorMessages = ref<Array<string>>([])

const convertFullWidthToHalfWidth = (str:string): string => {
  const fullWidthRegEx = /[Ａ-Ｚａ-ｚ０-９]/g
  return str.replace(fullWidthRegEx, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
}

const validateValue = (value: InputValue) => {
  errorMessages.value = []
  if (!inputValue.value && props.isRequired) errorMessages.value.push('必須項目です')
  else if (inputValue.value && props.validates.length) {
    props.validates.forEach(validate => {
      if (!validate.regex.test(String(value))) errorMessages.value.push(validate.message)
    })
  }
}

watch(() => props.modelValue, newValue => inputValue.value = newValue ?? '', { immediate: true })

watch(() => inputValue.value, newValue => {
  validateValue(newValue)
  if (props.modelValue !== undefined) emit('update:modelValue', Number.isInteger(newValue) ? Number(newValue) : convertFullWidthToHalfWidth(newValue.toString()))
}, { immediate: !!props.modelValue })
</script>

<template>
  <InputBox
    :cssStyle="cssStyle"
    class="text_box"
  >
    <slot name="before" />
    <input
      v-model="inputValue"
      :type="type"
      :required="isRequired"
      :name="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :autocomplete="autocomplete"
      :maxlength="maxLength"
      :invalid="errorMessages.length"
      :valid="!errorMessages.length"
    >
    <slot name="after" />
    <ErrorMessage
      :errorMessages="errorMessages"
      :class="$style.error_message"
    />
  </InputBox>
</template>

<style lang="scss" module>
:is(.text_box) {
  display: inline-flex;

  > input {
    flex: 1 1 auto;
  }
}

:is(.error_message) {
  position         : absolute;
  inset-block-start: 100%;
}
</style>