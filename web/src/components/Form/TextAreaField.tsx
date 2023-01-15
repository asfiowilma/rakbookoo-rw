import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, TextAreaField } from '@redwoodjs/forms'
import RakLabel from './Label'

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
      {label && <RakLabel name={name} label={label} />}
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
