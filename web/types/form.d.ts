import { ActionMeta, SingleValue } from 'react-select'

import { RegisterOptions, SelectFieldProps } from '@redwoodjs/forms'

type SelectOptionProps = {
  value: string | number
  label: string
  id?: string
  disabled?: boolean
}

interface RakInputProps {
  name: string
  defaultValue?: string | number
  label?: string
  validation?: RegisterOptions
}

interface RakSelectFieldProps extends Omit<SelectFieldProps, 'onChange'> {
  name: string
  label?: string | React.ReactNode
  helper?: string | React.ReactNode
  light?: boolean
  plain?: boolean
  options: SelectOptionProps[]
  onChange: (
    newValue: SingleValue<string | number>,
    actionMeta: ActionMeta<SelectOptionProps>
  ) => void
  value: string | null
  disabled?: boolean
  placeholder?: string
  isSearchable?: boolean
}

type RakCreatableSelectFieldProps = Omit<
  RakSelectFieldProps,
  'options' | 'value'
> & {
  id: string
  value: string
  onCreateInput?: CallableFunction
  options?: SelectOptionProps[]
}
