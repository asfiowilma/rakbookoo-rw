import { RadioField, UseFormReturn } from '@redwoodjs/forms'
import React from 'react'
import { RakInputProps } from 'types/form'
import RakLabel from './Label'

type RatingFieldProps = RakInputProps &
  Pick<UseFormReturn<BookInputData, object>, 'watch'>

const RatingField = ({ name, label }: RatingFieldProps) => {
  return (
    <>
      {label && <RakLabel name={name} label={label} />}
      <div className="rating rating-lg">
        <RadioField
          name={name}
          id="unrated"
          value={0}
          className="mask mask-star-2 hidden"
        />
        {Array.from({ length: 5 }).map((_, i) => (
          <RadioField
            name={name}
            id={`rating-${i + 1}`}
            key={`rating-${i + 1}`}
            value={i + 1}
            className="mask mask-star-2"
          />
        ))}
      </div>
    </>
  )
}

export default RatingField
