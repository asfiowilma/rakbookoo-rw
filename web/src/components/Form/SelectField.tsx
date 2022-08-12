/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select'
import { RakSelectFieldProps, SelectOptionProps } from 'types/form'

import {
  FieldError,
  Label,
  useErrorStyles,
  useRegister,
} from '@redwoodjs/forms'

const SelectField = ({
  label,
  name,
  options,
  value,
  onChange,
  validation,
  placeholder,
  disabled,
  isSearchable,
}: RakSelectFieldProps<string | number>) => {
  const register = useRegister({ name, validation })

  const { className: labelClassName, style: labelStyle } = useErrorStyles({
    className: `rw-label`,
    errorClassName: `rw-label rw-label-error`,
    name,
  })

  return (
    <>
      {label && (
        <Label name={name} className={labelClassName} style={labelStyle}>
          {label}
        </Label>
      )}
      <Select
        {...register}
        value={options.find((opt: SelectOptionProps) => opt.value === value)}
        onChange={(val, action) => onChange(val.value, action)}
        isDisabled={disabled}
        {...{ options, placeholder, isSearchable }}
      />
      <FieldError name={name} />
    </>
  )
}

export default SelectField
