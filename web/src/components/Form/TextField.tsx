import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, Label, TextField } from '@redwoodjs/forms'

const RakTextField = ({
  name,
  label,
  placeholder,
  validation,
  defaultValue,
  inputRef,
  leftAdornment,
  rightAdornment,
}: RakInputProps) => {
  return (
    <div className="form-control">
      {label && (
        <Label
          name={name}
          className="label"
          errorClassName="label rw-label-error"
        >
          {label}
        </Label>
      )}
      <div className={leftAdornment || rightAdornment ? 'input-group' : 'flex'}>
        {leftAdornment}
        <TextField
          ref={inputRef}
          className="input input-bordered flex-1"
          errorClassName="input input-bordered flex-1 rw-input-error"
          {...{ name, defaultValue, validation, placeholder }}
        />
        {rightAdornment}
      </div>
      <FieldError name={name} className="rw-field-error" />
    </div>
  )
}

export default RakTextField
