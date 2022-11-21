import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, Label, TextAreaField } from '@redwoodjs/forms'

const RakTextAreaField = ({
  name,
  label,
  validation,
  defaultValue,
  placeholder,
  cols,
  rows,
  inputRef,
}: RakInputProps) => {
  return (
    <>
      {label && (
        <Label
          name={name}
          className="rw-label label"
          errorClassName="label rw-label rw-label-error"
        >
          {label}
        </Label>
      )}
      <TextAreaField
        ref={inputRef}
        className="rw-input textarea textarea-bordered"
        errorClassName="rw-input rw-input-error"
        {...{ name, placeholder, defaultValue, validation, cols, rows }}
      />
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakTextAreaField
