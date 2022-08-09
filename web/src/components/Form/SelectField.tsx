/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { StylesConfig, components } from 'react-select'
import { RakSelectFieldProps, SelectOptionProps } from 'types/form'

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
}: RakSelectFieldProps) => {
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

  return (
    <>
      {label && (
        <Label name={name} className={labelClassName} style={labelStyle}>
          {label}
        </Label>
      )}
      <Select
        styles={customStyles}
        components={{ DropdownIndicator }}
        value={options.find((opt: SelectOptionProps) => opt.value === value)}
        isDisabled={disabled}
        onChange={(val, event) => onChange(val?.value, event)}
        {...{ options, placeholder, isSearchable }}
        {...register}
      />
      <FieldError name={name} />
    </>
  )
}

export default SelectField
