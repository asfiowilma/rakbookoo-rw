import React from 'react'

import { RakInputProps } from 'types/form'

import { FieldError, NumberField } from '@redwoodjs/forms'
import RakLabel from './Label'

const RakNumberField = ({
  name,
  label,
  defaultValue,
  validation,
  inputRef,
}: RakInputProps) => {
  return (
    <>
      {label && <RakLabel name={name} label={label} />}
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
