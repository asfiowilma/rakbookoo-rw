import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, Label, TextAreaField } from '@redwoodjs/forms'

const RakTextAreaField = ({
  name,
  label,
  validation,
  defaultValue,
  cols,
  rows,
  inputRef,
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
      <TextAreaField
        ref={inputRef}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        {...{ name, defaultValue, validation, cols, rows }}
      />
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakTextAreaField
