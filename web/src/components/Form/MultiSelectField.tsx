import React from 'react'

import RakLabel from './Label'
import Select from 'react-select'
import { SingleValue, ActionMeta } from 'react-select'
import {
  FieldError,
  useRegister,
  useErrorStyles,
  Controller,
} from '@redwoodjs/forms'
import { RakCreatableSelectFieldProps, SelectOptionProps } from 'types/form'

const MultiSelectField = ({
  label,
  name,
  options,
  validation,
  placeholder,
  onChange,
  disabled,
  isSearchable,
  isMulti,
}: RakCreatableSelectFieldProps) => {
  const onSelectChange = (
    val: SingleValue<SelectOptionProps>,
    action: ActionMeta<SelectOptionProps>
  ): void => {
    onChange(val, action)
  }

  const { style: labelStyle } = useErrorStyles({
    className: `label label-text`,
    errorClassName: `label label-text label-error`,
    name,
  })

  return (
    <>
      {label && <RakLabel name={name} label={label} style={labelStyle} />}
      <Controller
        name={name}
        rules={validation}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            onChange={onSelectChange}
            isDisabled={disabled}
            unstyled
            classNames={{
              control: () => 'input input-bordered h-min',
              menu: () => 'bg-base-300 rounded-md overflow-hidden',
              menuList: () => 'p-2',
              option: (state) =>
                `p-2 rounded-btn transition cursor-pointer ${
                  state.isFocused && 'bg-neutral-focus'
                }`,
              valueContainer: () => 'flex flex-wrap gap-2 py-3',
              multiValue: () => 'badge badge-lg gap-2',
            }}
            placeholder={placeholder}
            noOptionsMessage={() => null}
            value={
              field.value?.map((val) => ({
                value: val.id,
                label: val.name,
              })) ?? []
            }
            isSearchable={isSearchable}
            isMulti={isMulti}
          />
        )}
      />
      <FieldError name={name} />
    </>
  )
}

export default MultiSelectField
