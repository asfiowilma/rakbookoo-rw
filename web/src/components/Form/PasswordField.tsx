import { useState } from 'react'

import { FaEye, FaEyeSlash, FaUnlock } from 'react-icons/fa'
import { RakInputProps } from 'types/form'

import { FieldError, InputField, Label } from '@redwoodjs/forms'
import RakLabel from './Label'

const RakPasswordField = ({
  name,
  label,
  inputRef,
  placeholder,
  validation,
}: RakInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      {label && <RakLabel name={name} label={label} />}
      <div className="input-group">
        <span>
          <FaUnlock />
        </span>
        <InputField
          {...{ name, placeholder }}
          type={showPassword ? 'text' : 'password'}
          ref={inputRef}
          className="input input-bordered flex-1 border-r-0"
          errorClassName="input input-bordered flex-1 input-error"
          autoComplete="current-password"
          validation={{
            required: {
              value: true,
              message: 'Harap isi password',
            },
            ...validation,
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="btn btn-square btn-ghost border border-l-0 border-base-content border-opacity-20"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default RakPasswordField
