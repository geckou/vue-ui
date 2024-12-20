export type StateVariation = 'default' | 'error' | 'disabled' | 'valid' | 'focus'

export type BorderStyle = {
  color: string
  size: string
  radius: string
}

export type Option = {
  label : string
  value: SelectValue,
  order?: number
}

type InputBoxStyle = {
  textColor?: string
  placeholderColor?: string
  border?: BorderStyle
  backgroundColor?: string
  boxShadow?: string
}

export type InputBoxStyleForEachStatus = {
  default: InputBoxStyle
  error?: InputBoxStyle
  disabled?: InputBoxStyle
  valid?: InputBoxStyle
  focus?: InputBoxStyle
}

type ButtonStyle = {
  textColor?: string
  border?: BorderStyle
  backgroundColor?: string
  backgroundImage?: string
  boxShadow?: string
}

export type ButtonStyleForEachStatus = {
  default: ButtonStyle
  hover?: ButtonStyle
  disabled?: ButtonStyle
}

export type CheckBoxStyle = {
  border?: BorderStyle
  backgroundColor?: string
}

export type CheckBoxStyleForEachStatus = {
  default: CheckBoxStyle
  disabled?: CheckBoxStyle
}

export type RadioButtonStyle = {
  border?: Omit<BorderStyle, 'radius'>
  backgroundColor?: string
}

export type RadioButtonStyleForEachStatus = {
  default: RadioButtonStyle
  disabled?: RadioButtonStyle
}

type Validate = {
  regex: RegExp
  message: string
}

export type Validates = Array<Validate>