import { useEffect, useState } from 'react'

import {
  RakSelectFormProps,
  RakSelectSearchFormProps,
  SelectOptionProps,
} from 'types/form'

import { useQuery } from '@redwoodjs/web'

import CreatableSelectField from 'src/components/Form/CreatableSelectField'
import SelectField from './SelectField'
import MultiSelectField from './MultiSelectField'
export const TAG_OPTIONS_QUERY = gql`
  query FindTags {
    tags {
      id
      name
    }
  }
`
const SearchTagField = ({
  setValue,
  className,
}: RakSelectSearchFormProps<TagInput[]>) => {
  const { data } = useQuery(TAG_OPTIONS_QUERY)
  const [options, setOptions] = useState<Array<SelectOptionProps>>([])

  useEffect(() => {
    if (data && data.tags) {
      setOptions(data.tags.map((tag) => ({ value: tag.id, label: tag.name })))
    }
  }, [data])

  const onChange = (
    newValue: Array<SelectOptionProps>,
    _actionMeta: unknown
  ) => {
    const selectedTags = newValue.map((val) => ({
      id: val.value as number,
      name: val.label,
    }))
    setValue('tags', selectedTags)
  }

  return data ? (
    <div className={className}>
      <MultiSelectField
        isMulti
        id="tags"
        options={options}
        name="tags"
        placeholder="Tags"
        onChange={onChange}
      />
    </div>
  ) : null
}

export default SearchTagField
