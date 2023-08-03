import { Controller, FieldError, useErrorStyles } from '@redwoodjs/forms'
import { RakSelectFieldProps, SelectOptionProps } from 'types/form'

import RakLabel from './Label'
import Select from 'react-select'

const SelectField = ({
  label,
  name,
  options,
  onChange,
  validation,
  placeholder,
  disabled,
  isSearchable,
}: RakSelectFieldProps<string | number | SelectOptionProps>) => {
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
            value={options.find(
              (opt: SelectOptionProps) => opt.value === field.value
            )}
            onChange={(val, _) => onChange(val, _)}
            isDisabled={disabled}
            isSearchable={isSearchable}
            placeholder={placeholder}
            unstyled
            classNames={{
              control: () => 'input input-bordered',
              menu: () => 'bg-base-300 rounded-md overflow-hidden',
              menuList: () => 'p-2',
              option: (state) =>
                `p-2 rounded-btn transition cursor-pointer ${
                  state.isFocused && 'bg-neutral-focus'
                }`,
            }}
          />
        )}
      />
      <FieldError name={name} />
    </>
  )
}

export default SelectField
