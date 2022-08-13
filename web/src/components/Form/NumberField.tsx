import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, Label, NumberField } from '@redwoodjs/forms'

const RakNumberField = ({
  name,
  label,
  defaultValue,
  validation,
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

      <NumberField
        ref={inputRef}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{
          valueAsNumber: true,
          ...validation,
        }}
        {...{ name, defaultValue }}
      />

      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakNumberField
