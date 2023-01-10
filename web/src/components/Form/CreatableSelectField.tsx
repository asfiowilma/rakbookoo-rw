/* eslint-disable @typescript-eslint/no-explicit-any */
import { SingleValue, ActionMeta } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { RakCreatableSelectFieldProps, SelectOptionProps } from 'types/form'

import {
  FieldError,
  Label,
  useErrorStyles,
  useRegister,
} from '@redwoodjs/forms'

const CreatableSelectField = ({
  label,
  name,
  options,
  validation,
  placeholder,
  onChange,
  disabled,
  isSearchable,
  isMulti,
  id,
}: RakCreatableSelectFieldProps) => {
  const { onChange: _onChange, ...register } = useRegister({ name, validation })

  const { className: labelClassName, style: labelStyle } = useErrorStyles({
    className: `rw-label`,
    errorClassName: `rw-label rw-label-error`,
    name,
  })

  const onSelectChange = (
    val: SingleValue<SelectOptionProps>,
    action: ActionMeta<SelectOptionProps>
  ): void => {
    onChange(val, action)
  }

  return (
    <>
      {label && (
        <Label
          name={name}
          className="label label-text"
          errorClassName="label label-text label-error"
          style={labelStyle}
        >
          {label}
        </Label>
      )}
      <CreatableSelect
        id={`createable-${id}`}
        options={options}
        onChange={onSelectChange}
        isDisabled={disabled}
        formatCreateLabel={(inputValue: string) => inputValue}
        noOptionsMessage={() => null}
        {...{ isSearchable, isMulti, placeholder }}
        {...register}
      />
      <FieldError name={name} />
    </>
  )
}

export default CreatableSelectField
