import React from 'react'
import { Label } from '@redwoodjs/forms'

type LabelProps = {
  name: string
  style?: React.CSSProperties
  label?: string | React.ReactNode
}

const RakLabel = ({ name, label, style }: LabelProps) => {
  return (
    <Label
      name={name}
      className="label label-text font-medium"
      errorClassName="label label-text label-error"
      style={style}
    >
      {label}
    </Label>
  )
}

export default RakLabel
