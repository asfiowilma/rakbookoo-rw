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
          className="label"
          errorClassName="label rw-label-error"
        >
          {label}
        </Label>
      )}
      <TextAreaField
        ref={inputRef}
        className="textarea textarea-bordered"
        errorClassName="rw-input-error"
        {...{ name, placeholder, defaultValue, validation, cols, rows }}
      />
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakTextAreaField
