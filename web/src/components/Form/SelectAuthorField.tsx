import { useEffect, useState } from 'react'

import { RakSelectFormProps, SelectOptionProps } from 'types/form'

import { useQuery } from '@redwoodjs/web'

import CreatableSelectField from 'src/components/Form/CreatableSelectField'

export const AUTHOR_OPTIONS_QUERY = gql`
  query FindAuthors {
    authors {
      id
      name
    }
  }
`
const SelectAuthorField = ({
  defaultValue,
  setValue,
}: RakSelectFormProps<AuthorInput[]>) => {
  const { data } = useQuery(AUTHOR_OPTIONS_QUERY)
  const [options, setOptions] = useState<Array<SelectOptionProps>>([])

  useEffect(() => {
    if (data && data.authors) {
      setOptions(
        data.authors.map((author) => ({ value: author.id, label: author.name }))
      )
    }
  }, [data])

  const onChange = (
    newValue: Array<SelectOptionProps>,
    _actionMeta: unknown
  ) => {
    const selectedAuthors = newValue.map((val) => ({
      id: typeof val.value === 'number' ? val.value : null,
      name: val.label,
    }))
    setValue('authors', selectedAuthors)
  }

  return data ? (
    <CreatableSelectField
      isMulti
      id="authors"
      options={options}
      name="authors"
      label="Author(s)"
      defaultValue={defaultValue.map((val) => val.id)}
      onChange={onChange}
    />
  ) : null
}

export default SelectAuthorField
