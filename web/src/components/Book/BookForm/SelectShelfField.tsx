import { useEffect, useState } from 'react'

import { RakSelectFormProps, SelectOptionProps } from 'types/form'

import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

import SelectField from 'src/components/Form/SelectField'

export const SHELF_OPTIONS_QUERY = gql`
  query FindShelves($userUid: String!) {
    shelves(userUid: $userUid) {
      id
      name
      userUid
    }
  }
`

const SelectShelfField = ({
  defaultValue,
  setValue,
}: RakSelectFormProps<number>) => {
  const { currentUser } = useAuth()
  const { data } = useQuery(SHELF_OPTIONS_QUERY, {
    variables: { userUid: currentUser.sub },
  })
  const [shelfOptions, setShelfOptions] = useState<Array<SelectOptionProps>>([])

  useEffect(() => {
    if (data)
      setShelfOptions(
        data.shelves.map((shelf) => ({ value: shelf.id, label: shelf.name }))
      )
  }, [data])

  return (
    <SelectField
      label="Shelf"
      defaultValue={defaultValue}
      name="shelfId"
      options={shelfOptions}
      onChange={(val, _action) => setValue('shelfId', val as number)}
    />
  )
}

export default SelectShelfField
