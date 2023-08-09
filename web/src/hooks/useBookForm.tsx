import {
  CREATE_BOOK_MUTATION,
  UPDATE_BOOK_MUTATION,
} from 'src/components/Book/mutations'

import { Book } from 'types/graphql'
import { ChooseImageBy } from 'src/components/Form/CoverImageField'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'
import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const useBookForm = (book?: Partial<Book>) => {
  const [createBook, { loading: isCreateLoading, error: createError }] =
    useMutation(CREATE_BOOK_MUTATION, {
      onCompleted: () => {
        toast.success('Book created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const [updateBook, { loading: isEditLoading, error: editError }] =
    useMutation(UPDATE_BOOK_MUTATION, {
      onCompleted: () => {
        toast.success('Book updated')
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
        rating: book.rating.toString() ?? '0',
        shelfId: book.shelfId ?? 0,
        chooseImageBy: ChooseImageBy.url,
      }
    }
    return {
      isbn: '',
      title: '',
      authors: [],
      tags: [],
      coverImage: '',
      blurb: '',
      rating: '0',
      shelfId: 0,
      chooseImageBy: ChooseImageBy.upload,
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
      setValue('rating', book.rating.toString() ?? '0')
      setValue('shelfId', book.shelfId ?? 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book])

  const cleanFormData = (data) => {
    return {
      ...data,
      authors: data.authors.map((author) => ({
        id: author.id,
        name: author.name,
      })),
      tags: data.tags.map((tag) => ({ id: tag.id, name: tag.name })),
      shelfId: parseInt(data.shelfId),
      rating: parseInt(data.rating),
    }
  }

  return {
    createBook,
    isCreateLoading,
    createError,
    updateBook,
    isEditLoading,
    editError,
    handleSubmit,
    control,
    cleanFormData,
    watch,
    setValue,
    formMethods,
  }
}

export default useBookForm
