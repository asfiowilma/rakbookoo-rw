import { useEffect } from 'react'

import { Book } from 'types/graphql'

import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBookMutation($input: CreateBookInput!) {
    createBook(input: $input) {
      id
    }
  }
`

const useBookForm = (book?: Book) => {
  const [createBook, { loading: isCreateLoading, error: createError }] =
    useMutation(CREATE_BOOK_MUTATION, {
      onCompleted: () => {
        toast.success('Book created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const setDefaultValue = () => {
    if (book) {
      return {
        isbn: book?.isbn ?? '',
        title: book.title,
        authors: book.authors ?? [],
        tags: book.tags ?? [],
        coverImage: book?.coverImage ?? '',
        blurb: book?.blurb ?? '',
        rating: book.rating ?? 0,
        shelfId: book.shelfId ?? 0,
      }
    }
    return {
      isbn: '',
      title: '',
      authors: [],
      tags: [],
      coverImage: '',
      blurb: '',
      rating: 0,
      shelfId: 0,
    }
  }

  const formMethods = useForm<BookInputData>({
    defaultValues: setDefaultValue(),
  })
  const { handleSubmit, control, watch, setValue } = formMethods

  useEffect(() => {
    if (book) {
      setValue('isbn', book?.isbn ?? '')
      setValue('title', book.title)
      setValue('authors', book.authors ?? [])
      setValue('tags', book.tags ?? [])
      setValue('coverImage', book?.coverImage ?? '')
      setValue('blurb', book?.blurb ?? '')
      setValue('rating', book.rating ?? 0)
      setValue('shelfId', book.shelfId ?? 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book])

  return {
    createBook,
    isCreateLoading,
    createError,
    handleSubmit,
    control,
    watch,
    setValue,
    formMethods,
  }
}

export default useBookForm
