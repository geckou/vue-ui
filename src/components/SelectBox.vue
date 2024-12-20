<script setup lang="ts">
import type {
  Option,
  InputBoxStyleForEachStatus,
} from '@/types'
import {
  ref,
  watch,
} from 'vue'
import InputBox from '@/components/InputBox.vue'
import ErrorMessages from '@/components/ErrorMessages.vue'
import KeyboardArrowDownIcon from '@/components/Icon/KeyboardArrowDownIcon.vue'

type SelectValue = string | number

const emit = defineEmits<{ (e: 'update:modelValue', newValue: SelectValue): void }>()

const props = withDefaults(defineProps<{
  modelValue: SelectValue
  options : Array<Option>
  name: string
  cssStyle?: InputBoxStyleForEachStatus
  placeholder?: string
  canOmitSelect?: boolean
  isDisabled? : boolean
  isRequired?: boolean
}>(), {
  cssStyle   : () => ({ default: {} }),
  placeholder: '選択してください',
})

const errorMessages = ref<Array<string>>([])
const selectedValue = ref<SelectValue>(props.modelValue ?? '')

const validateValue = () => {
  errorMessages.value = []
  if (!selectedValue.value && props.isRequired) errorMessages.value.push('必須項目です')
}

watch(() => props.modelValue, newValue => { selectedValue.value = newValue }, { immediate: true })

watch(() => selectedValue.value, newValue => {
  validateValue()
  emit('update:modelValue', newValue)
}, { immediate: !!props.modelValue })
</script>

<template>
  <InputBox
    :cssStyle="cssStyle"
    :class="$style.select_box"
  >
    <select
      v-model="selectedValue"
      :class="$style.select"
    >
      <option
        v-if="canOmitSelect"
        value=""
      >
        {{ placeholder || '選択しない' }}
      </option>
      <option
        v-else
        disabled
        selected
        value=""
      >
        {{ placeholder || '選択してください' }}
      </option>
      <option
        v-if="['0', 'NA'].includes(selectedValue.toString()) && isDisabled"
        disabled
        selected
        :value="selectedValue"
      >
        {{ placeholder || '選択してください' }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div :class="$style.arrow_container">
      <slot name="arrow" />
      <KeyboardArrowDownIcon
        v-if="!$slots.arrow"
        :class="$style.arrow"
      />
    </div>
    <ErrorMessages />
  </InputBox>
</template>

<style lang="scss" module>
:is(.select_box) {
  display: inline-flex;

  > select {
    flex              : 1 1 auto;
    padding-inline-end: 2rem;
    cursor            : pointer;
  }
}

:is(.arrow_container) {
  display         : flex;
  align-items     : center;
  position        : absolute;
  margin          : auto;
  inset-inline-end: .5rem;
  inset-block     : 0;
  pointer-events  : none;

  > * {
    color     : currentColor;
    fill      : currentColor;
    block-size: 1rem;
  }
}
</style>