import { useEffect, useState } from 'react'

import { RakSelectFormProps, SelectOptionProps } from 'types/form'

import { useQuery } from '@redwoodjs/web'

import CreatableSelectField from 'src/components/Form/CreatableSelectField'
export const TAG_OPTIONS_QUERY = gql`
  query FindTags {
    tags {
      id
      name
    }
  }
`
const SelectTagField = ({ setValue }: RakSelectFormProps<TagInput[]>) => {
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
      id: typeof val.value === 'number' ? val.value : null,
      name: val.label,
    }))
    setValue('tags', selectedTags)
  }

  return data ? (
    <CreatableSelectField
      isMulti
      id="tags"
      options={options}
      name="tags"
      label="Tag"
      placeholder="Buku ini tentang apa? Genrenya? Trope? cth: fantasy, gore, enemies to lovers"
      onChange={onChange}
    />
  ) : null
}

export default SelectTagField
