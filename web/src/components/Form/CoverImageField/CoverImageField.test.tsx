import { Book } from 'types/graphql'
import CoverImageField from './index'
import { render } from '@redwoodjs/testing/web'
import { useForm } from '@redwoodjs/forms'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CoverImageField', () => {
  it('renders successfully', () => {
    const { watch: mockWatch } = useForm<BookInputData>()
    const mockBook: Partial<Book> = {
      title: 'Book Title',
    }

    expect(() => {
      render(<CoverImageField watch={mockWatch} book={mockBook} />)
    }).not.toThrow()
  })
})
