/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import {
  StylesConfig,
  components,
  SingleValue,
  ActionMeta,
  InputActionMeta,
} from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { RakCreatableSelectFieldProps, SelectOptionProps } from 'types/form'

import {
  FieldError,
  Label,
  useErrorStyles,
  useRegister,
} from '@redwoodjs/forms'

const DropdownIndicator = (props: any): JSX.Element => {
  return (
    <components.DropdownIndicator {...props}>v</components.DropdownIndicator>
  )
}

const SelectField = ({
  label,
  name,
  options,
  value,
  validation,
  placeholder,
  onChange,
  disabled,
  isSearchable,
  onCreateInput,
  id,
}: RakCreatableSelectFieldProps) => {
  const [addOnOptions, setAddOnOptions] = useState(
    options
      ? options
      : value !== ''
      ? [
          {
            label: value,
            value,
          },
        ]
      : []
  )

  const { onChange: _onChange, ...register } = useRegister({
    name,
    validation: { ...validation, required: true },
  })

  const { className: labelClassName, style: labelStyle } = useErrorStyles({
    className: `my-label-class`,
    errorClassName: `my-label-error-class`,
    name,
  })

  const customStyles: StylesConfig<SelectOptionProps, false> = {
    control: (styles: any) => ({
      ...styles,
      borderRadius: '8px',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: 'burlywood',
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: 'black',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  }

  const onSelectChange = (
    val: SingleValue<SelectOptionProps>,
    action: ActionMeta<SelectOptionProps>
  ): void => {
    if (onCreateInput) {
      onCreateInput(setAddOnOptions, val?.value)
    }

    onChange(val?.value, action)
  }

  const onSelectInputChange = (
    newValue: string,
    _actionMeta: InputActionMeta
  ): void => {
    if (onCreateInput) {
      onCreateInput(setAddOnOptions, newValue)
    }
  }

  return (
    <>
      {label && (
        <Label name={name} className={labelClassName} style={labelStyle}>
          {label}
        </Label>
      )}
      <CreatableSelect
        id={`createable-${id}`}
        styles={customStyles}
        options={addOnOptions}
        placeholder={placeholder}
        components={{ DropdownIndicator }}
        onChange={onSelectChange}
        onInputChange={onSelectInputChange}
        value={addOnOptions.find(
          (opt: SelectOptionProps) => opt.value === value
        )}
        isDisabled={disabled}
        formatCreateLabel={(inputValue: string) => inputValue}
        noOptionsMessage={() => null}
        isSearchable={isSearchable}
        {...register}
      />
      <FieldError name={name} />
    </>
  )
}

export default SelectField
