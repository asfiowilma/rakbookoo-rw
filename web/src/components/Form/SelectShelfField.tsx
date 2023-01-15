import { useEffect, useState } from 'react'

import { RakSelectFormProps, SelectOptionProps } from 'types/form'

import { useQuery } from '@redwoodjs/web'

import SelectField from 'src/components/Form/SelectField'

export const SHELF_OPTIONS_QUERY = gql`
  query FindShelves {
    shelves {
      id
      name
      userUid
    }
  }
`
const SelectShelfField = ({ setValue }: RakSelectFormProps<number>) => {
  const { data } = useQuery(SHELF_OPTIONS_QUERY)
  const [shelfOptions, setShelfOptions] = useState<Array<SelectOptionProps>>([])

  useEffect(() => {
    if (data)
      setShelfOptions(
        data.shelves.map((shelf) => ({ value: shelf.id, label: shelf.name }))
      )
  }, [data])

  return (
    <SelectField
      label="Rak"
      name="shelfId"
      options={shelfOptions}
      placeholder="Pilih rak"
      onChange={(val, _action) => setValue('shelfId', val as number)}
    />
  )
}

export default SelectShelfField
