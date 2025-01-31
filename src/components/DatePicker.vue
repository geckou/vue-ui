<script setup lang="ts">
import { FormValidationManager } from '~/scripts/form-validation-manager'
import ErrorMessage from '@/components/ErrorMessage.vue'

const emit = defineEmits<{ (e: 'update:modelValue', newValue: string | null): void }>()
const datePicker = ref<HTMLInputElement | null>(null)
const props = withDefaults(defineProps<{
  name: string
  modelValue: string
  isDisabled? : boolean
  isRequired?: boolean
  formValidationManager?: FormValidationManager | null
  minDate?: string
  maxDate?: string
  size?: 'small' | 'medium'
  type?: 'date' | 'month'
}>(), {
  isDisabled           : false,
  formValidationManager: null,
  minDate              : '',
  maxDate              : '',
  size                 : 'medium',
  type                 : 'date',
})

const dateObject = reactive({
  year : '',
  month: '',
  day  : '',
})

const dateValue: Ref<string> = ref('')
const errorMessage = ref('')

const setValid = (isValid: boolean): void => {
  if (props.formValidationManager) props.formValidationManager.setValid(props.name, isValid)
}

const validateInput = (value: string) => {
  if (!value && props.isRequired) return { isValid: false, message: '必須項目です' }
  return { isValid: true, message: '' }
}

const validateObject = (object: {
  year: string
  month: string
  day?: string
}) => {
  const { year, month, day } = object
  const requiredCheck = (value: string | undefined) => props.isRequired && !value
  const isNumeric = (value: string) => /^\d+$/.test(value)

  if (props.type === 'month') delete object.day
  if (Object.values(object).every(value => !value) && !props.isRequired) return { isValid: true, message: '' }
  if ([year, month, day].some(requiredCheck)) return { isValid: false, message: '必須項目です' }
  if (year.length !== 4 || !isNumeric(year)) return { isValid: false, message: '年は4桁の数字で入力してください' }
  if (month.length !== 2 || !isNumeric(month)) return { isValid: false, message: '月は2桁の数字で入力してください' }
  if (day && (day.length !== 2 || !isNumeric(day))) return { isValid: false, message: '日は2桁の数字で入力してください' }

  const monthNum = parseInt(month, 10)
  if (monthNum < 1 || monthNum > 12) return { isValid: false, message: '月は01から12の間で入力してください' }

  const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()
  const dayNum = day ? parseInt(day, 10) : null
  if (dayNum && (dayNum < 1 || dayNum > daysInMonth(parseInt(year, 10), monthNum))) return { isValid: false, message: `日は01から${daysInMonth(parseInt(year, 10), monthNum)}の間で入力してください` }

  return { isValid: true, message: '' }
}

const setDateObject = (value: string): void => {
  const [year, month, day] = value.split('-')
  dateObject.year = year
  dateObject.month = month
  if (day) dateObject.day = day
}

watch(() => dateValue.value, newValue => {
  setDateObject(newValue)
  const { isValid, message } = validateInput(newValue)
  errorMessage.value = message
  emit('update:modelValue', newValue)
  setValid(isValid)
})

watch(() => dateObject, newValue => {
  const { isValid, message } = validateObject(newValue)
  errorMessage.value = message
  const { year, month, day } = dateObject
  const value = [year, month, day].filter(Boolean).join('-')
  setValid(isValid)
  if (isValid) dateValue.value = value
}, { deep: true })

if (props.modelValue) {
  dateValue.value = new Date(props.modelValue).toISOString().slice(0, 10)
  setDateObject(dateValue.value)
}
</script>

<template>
  <InputContainer
    :isDisabled="isDisabled"
    :class="[
      $style.date_picker,
      $style[size],
      { [$style.is_disabled]: isDisabled },
    ]"
    :size="size"
    :isError="!!errorMessage"
  >
    <div :class="$style.date_input">
      <IconCalendar :class="$style.icon" />
      <input
        ref="datePicker"
        v-model="dateValue"
        :type="type"
        :name="name"
        :max="maxDate"
        :min="minDate"
        :isRequired="isRequired"
      >
    </div>
    <input
      v-model="dateObject.year"
      placeholder="年"
      maxlength="4"
      type="text"
      :class="$style.year"
    >/
    <input
      v-model="dateObject.month"
      placeholder="月"
      maxlength="2"
      type="text"
    >
    <span v-if="type === 'date'">/</span>
    <input
      v-if="type === 'date'"
      v-model="dateObject.day"
      placeholder="日"
      maxlength="2"
      type="text"
    >  
    <ErrorMessage :errorMessage="errorMessage" />
  </InputContainer>
</template>

<style lang="scss" module>
@use '~/assets/scss/mixin.scss' as *;

.icon {
  @include icon($color: var(--link-color));
  margin  : auto;
  position: absolute;
  top     : 0;
  left    : var(--sp-small);
  bottom  : 0;
}

.date_input {
  flex    : 0 0 auto;
  position: relative;
  
  > input {
    width  : calc(var(--icon-medium) + var(--sp-small) * 2);
    padding: var(--sp-medium) var(--sp-small);

    &[type="date"],
    &[type="month"] {
      opacity: 0;

      &::-webkit-calendar-picker-indicator {
        position: absolute;
        left    : 0;
        width   : 100%;
        height  : 100%;
        opacity: 0;
        cursor  : pointer;
      }
    }
  }
}

.date_picker {
  display    : flex;
  align-items: center;
  width      : 100%;
  position   : relative;
  line-height: 1;

  > input {
    padding: var(--sp-medium);
    width  : calc( var(--sp-medium) * 2 + 3ch);

    &.year {
      width: calc( var(--sp-medium) * 2 + 5ch);
    }

    &[type="text"] {
      flex: 0 0 auto;
    }
  }

  &.small {
    .icon {
      @include icon($color: var(--link-color), $size: var(--icon-small));
      left: var(--sp-small);
    }

    input {
      padding  : var(--sp-min) var(--sp-small);
      font-size: var(--fs-small);
    }
  }
}
</style>