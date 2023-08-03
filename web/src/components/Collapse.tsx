import { Transition } from '@headlessui/react'
import React from 'react'

type CollapseProps = {
  className?: string
  children: React.ReactNode
}

interface CollapseButtonProps extends CollapseProps {
  onClick: () => void
}

interface CollapseContentProps extends CollapseProps {
  isCollapsed: boolean
}

export const CollapseButton = ({
  className,
  onClick,
  children,
}: CollapseButtonProps) => {
  return (
    <button className={`btn ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export const CollapseContent = ({
  className,
  children,
  isCollapsed,
}: CollapseContentProps) => {
  return (
    <Transition
      appear
      show={!isCollapsed}
      enter="transition origin-top"
      enterFrom="scale-y-0"
      enterTo="scale-y-1"
      leave="transition origin-top"
      leaveFrom="scale-y-1"
      leaveTo="scale-y-0"
      className={className}
    >
      {children}
    </Transition>
  )
}
