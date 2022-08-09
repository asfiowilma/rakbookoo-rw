import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, Label, TextField } from '@redwoodjs/forms'

const RakTextField = ({
  name,
  label,
  validation,
  defaultValue,
}: RakInputProps) => {
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
      <TextField
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        {...{ name, defaultValue, validation }}
      />
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakTextField
