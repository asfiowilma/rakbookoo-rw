import { useEffect, useState } from 'react'

import { RakSelectSearchFormProps, SelectOptionProps } from 'types/form'

import { useQuery } from '@redwoodjs/web'

import CreatableSelectField from 'src/components/Form/CreatableSelectField'
import SelectField from './SelectField'
import MultiSelectField from './MultiSelectField'

export const AUTHOR_OPTIONS_QUERY = gql`
  query FindAuthors {
    authors {
      id
      name
    }
  }
`
const SearchAuthorField = ({
  setValue,
  className,
}: RakSelectSearchFormProps<AuthorInput[]>) => {
  const { data } = useQuery(AUTHOR_OPTIONS_QUERY)
  const [options, setOptions] = useState<Array<SelectOptionProps>>([])

  useEffect(() => {
    if (data && data.authors) {
      setOptions(
        data.authors.map((author) => ({ value: author.id, label: author.name }))
      )
    }
  }, [data])

  const onChange = (newValue: Array<SelectOptionProps>) => {
    const selectedAuthors = newValue.map((val) => ({
      id: val.value as number,
      name: val.label,
    }))
    setValue('authors', selectedAuthors)
  }

  return data ? (
    <div className={className}>
      <MultiSelectField
        isMulti
        id="authors"
        options={options}
        name="authors"
        placeholder="Penulis"
        onChange={onChange}
      />
    </div>
  ) : null
}

export default SearchAuthorField
