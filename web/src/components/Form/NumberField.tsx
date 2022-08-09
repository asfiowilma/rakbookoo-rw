import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, Label, NumberField, useRegister } from '@redwoodjs/forms'

const RakNumberField = ({
  name,
  label,
  defaultValue,
  validation,
}: RakInputProps) => {
  const register = useRegister({
    name,
    validation,
  })

  return (
    <>
      {label && (
        <Label
          name={name}
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          {label}
        </Label>
      )}

      <NumberField
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        {...{ name, defaultValue }}
        {...register}
      />

      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakNumberField
