// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CoverImageField> = (args) => {
//   return <CoverImageField {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import { Book } from 'types/graphql'
import type { ComponentMeta } from '@storybook/react'
import CoverImageField from './index'
import { useForm } from '@redwoodjs/forms'

export const generated = () => {
  const { watch: mockWatch } = useForm<BookInputData>()
  const mockBook: Partial<Book> = {
    title: 'Book Title',
  }
  return <CoverImageField watch={mockWatch} book={mockBook} />
}

export default {
  title: 'Components/CoverImageField',
  component: CoverImageField,
} as ComponentMeta<typeof CoverImageField>
