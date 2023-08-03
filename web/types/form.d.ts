import { MutableRefObject, ReactNode } from 'react'

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
  placeholder?: string
  label?: string
  validation?: RegisterOptions
  cols?: number
  rows?: number
  leftAdornment?: ReactNode
  rightAdornment?: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: MutableRefObject<any>
  className?: string
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
  extends Pick<UseFormReturn<BookInputData, object>, 'setValue'> {
  defaultValue?: T
}

interface RakSelectSearchFormProps<T>
  extends Pick<UseFormReturn<SearchData, object>, 'setValue'> {
  defaultValue?: T
  className?: string
}

type RakCreatableSelectFieldProps = Omit<RakSelectFieldProps, 'options'> & {
  id: string
  onCreateInput?: CallableFunction
  options?: SelectOptionProps[]
}
