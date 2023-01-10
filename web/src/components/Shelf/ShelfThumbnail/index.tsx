import Avatar from 'boring-avatars'
import React from 'react'

const ShelfThumbnail = ({
  name,
  size,
  className,
}: {
  name: string
  size: number
  className?: string
}) => {
  return (
    <div
      className={'rounded-box flex-none overflow-hidden ' + className}
      title={name}
    >
      <Avatar
        size={size}
        name={name}
        square
        variant="beam"
        colors={['#6419E6', '#732DFA', '#A083FF', '#BFB0FF', '#EBE7FF']}
      />
    </div>
  )
}

export default ShelfThumbnail
