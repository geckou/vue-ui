<script setup lang="ts">
import { FormValidationManager } from '~/scripts/form-validation-manager'
const emit = defineEmits<{ (e: 'update:modelValue', newValue: string): void }>()

type Date = {
  year: string
  month: string
  day?: string
}
const props = withDefaults(defineProps<{
  name: string
  modelValue: string
  isRequired?: boolean
  formValidationManager?: FormValidationManager | null
  type?: 'date' | 'month'
}>(), {
  isDisabled           : false,
  formValidationManager: null,
  type                 : 'date',
})

const birthday: Ref<Date> = ref({
  year : '',
  month: '',
  day  : '',
})

const yearsOptions = computed(() => {
  const today = new Date()
  const maxYear = today.getFullYear() - 100
  const currentYear = today.getFullYear() - 14
  const years = Array.from({ length: currentYear - maxYear + 1 }, (_, i) => (maxYear + i).toString())
  return years.map(year => ({ label: year, value: year }))
})

const monthOptions = computed(() => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString()
    return {
      label: month,
      value: month.padStart(2, '0'),
    }
  })
})

const dayOptions = computed(() => {
  const days = []
  const baseYear = 2000
  const daysInMouth = new Date(baseYear, Number(birthday.value?.month), 0).getDate()

  for (let day = 1; day <= daysInMouth; day++) {
    const dayString = day.toString()
    days.push(dayString)
  }

  return days.map(day => ({
    label: day,
    value: String(day).padStart(2, '0'),
  }))
})

const openDropdown = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const select = target.firstElementChild as HTMLSelectElement
  if (select) {
    select.click()
  }
}

const selectItem = (event: Event, key: 'year' | 'day' | 'month') => {
  const target = event.target as HTMLSelectElement
  const { value } = target
  birthday.value = { ...birthday.value, [key]: value }
}

watchEffect(() => {
  if (props.modelValue) {
    const [year, month, day] = props.modelValue.split('-')
    birthday.value = { year, month, day }
  }
})

watch(() => birthday.value, newValue => {
  if (!newValue.year && !newValue.month && !newValue.day) emit('update:modelValue', '')
  else if (!newValue.year || !newValue.month || !newValue.day) return
  else emit('update:modelValue', `${newValue.year}-${newValue.month}-${newValue.day}`)
}, { deep: true })
</script>

<template>
  <InputContainer :class="$style.date_selector">
    <div
      :class="[$style.selector_wrapper]"
      @click="openDropdown($event)"
    >
      <select
        :value="birthday.year"
        :class="$style.year"
        @change="selectItem($event, 'year')"
      >
        <option
          disabled
          selected
          value=""
        >
          年
        </option>
        <option
          v-for="year in yearsOptions"
          :key="year.value"
          :value="year.value"
        >
          {{ year.label }}
        </option>
      </select>
      <IconChevronDown />
    </div>
    <div
      :class="[$style.selector_wrapper]"
      @click="openDropdown($event)"
    >
      <select
        :value="birthday.month"
        @change="selectItem($event, 'month')"
      >
        <option
          disabled
          selected
          value=""
        >
          月
        </option>
        {{ monthOptions }}
        <option
          v-for="month in monthOptions"
          :key="month.value"
          :value="month.value"
        >
          {{ month.label }}
        </option>
      </select>
      <IconChevronDown />
    </div>
    <div
      :class="[$style.selector_wrapper]"
      @click="openDropdown($event)"
    >
      <select
        :value="birthday.day"
        @change="selectItem($event, 'day')"
      >
        <option
          disabled
          selected
          value=""
        >
          日
        </option>
        <option
          v-for="day in dayOptions"
          :key="day.value"
          :value="day.value"
        >
          {{ day.label }}
        </option>
      </select>
      <IconChevronDown />
    </div>
    <TextButton
      text="削除"
      variant="caution"
      :class="$style.delete_button"
      @click="birthday = { year: '', month: '', day: '' }"
    />
  </InputContainer>
</template>

<style lang="scss" module>
@use '~/assets/scss/mixin.scss' as *;

.date_selector {
  width      : max-content;
  display    : flex;
  align-items: center;
  position   : relative;

  > * {
    &:not(:last-of-type) {
      &:after {
        content: '/';
      }
    }
  }
}

.selector_wrapper {
  position: relative;
  width   : max-content;

  > svg {
    @include icon($color: var(--link-color));
    position      : absolute;
    margin        : auto;
    top           : 0;
    right         : var(--sp-small);
    bottom        : 0;
    pointer-events: none;
  }

  &:has(select:focus) {
    svg {
      rotate: 180deg;
    }
  }

  > select {
    width             : calc(3ch + (var(--sp-medium) * 2) + var(--icon-medium));
    padding           : var(--sp-medium);
    padding-inline-end: calc((var(--sp-small) * 2) + var(--icon-medium));
    cursor            : pointer;

    &.year {
      width: calc(5ch + (var(--sp-medium) * 2) + var(--icon-medium));
    }
  }
}

.delete_button {
  margin-inline: var(--sp-medium);
  font-size    : var(--fs-small);
}
</style>