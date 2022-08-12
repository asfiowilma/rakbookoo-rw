import { ActionMeta } from 'react-select'

import {
  RegisterOptions,
  SelectFieldProps,
  UseFormReturn,
} from '@redwoodjs/forms'

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
  cols?: number
  rows?: number
}

interface RakSelectFieldProps<T = unknown>
  extends Omit<SelectFieldProps, 'onChange' | 'value' | 'defaultValue'> {
  name: string
  label?: string | React.ReactNode
  helper?: string | React.ReactNode
  light?: boolean
  plain?: boolean
  options: SelectOptionProps[]
  onChange: (newValue: T, actionMeta: ActionMeta<SelectOptionProps>) => void
  defaultValue?: unknown
  value?: T
  disabled?: boolean
  placeholder?: string
  isSearchable?: boolean
  isMulti?: boolean
}

interface RakSelectFormProps<T>
  extends Pick<
    UseFormReturn<BookInputData, object>,
    'control' | 'setValue' | 'watch'
  > {
  defaultValue?: T
}

type RakCreatableSelectFieldProps = Omit<RakSelectFieldProps, 'options'> & {
  id: string
  onCreateInput?: CallableFunction
  options?: SelectOptionProps[]
}
