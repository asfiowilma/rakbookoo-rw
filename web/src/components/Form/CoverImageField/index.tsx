import { BiBookHeart, BiGlobe, BiSearch } from 'react-icons/bi'
import {
  FileField,
  Form,
  RadioField,
  TextField,
  UseFormReturn,
  useForm,
} from '@redwoodjs/forms'

import { Book } from 'types/graphql'
import { FaUpload } from 'react-icons/fa'
import Input from 'react-select/dist/declarations/src/components/Input'
import RakLabel from '../Label'
import RakTextField from '../TextField'
import { useState } from 'react'

interface CoverImageFieldProps
  extends Pick<UseFormReturn<BookInputData, object>, 'watch'> {
  book: Partial<Book>
}

interface CoverImage {
  chooseImageBy: ChooseImageBy
}

enum ChooseImageBy {
  upload = 'Upload',
  url = 'URL',
  search = 'Search',
}

const CoverImageField = ({ watch, book }: CoverImageFieldProps) => {
  const coverForm = useForm<CoverImage>({
    defaultValues: { chooseImageBy: ChooseImageBy.upload },
  })

  return (
    <>
      <div className="relative flex min-w-[20rem] justify-center rounded-xl border border-base-content/20 p-6">
        {watch('coverImage') ? (
          <>
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img
                src={watch('coverImage')}
                alt={book?.title ?? 'Book Cover'}
                className="h-full w-full scale-110 bg-base-300 object-cover object-center blur"
              />
            </div>
            <img
              src={watch('coverImage')}
              alt={book?.title ?? 'Book Cover'}
              className="aspect-[5/8] h-80 rounded-lg bg-base-300 object-cover"
            />
          </>
        ) : (
          <div className="flex aspect-[5/8] h-80 w-auto flex-col items-center justify-center rounded-md bg-neutral text-center text-neutral-content shadow">
            <BiBookHeart className="h-12 w-12" />
          </div>
        )}
      </div>
      <RakLabel name="coverImage" label="Book Cover"></RakLabel>
      <Form formMethods={coverForm} className="join my-2">
        <RadioField
          className="btn join-item btn-sm"
          name="chooseImageBy"
          value={ChooseImageBy.upload}
          aria-label={ChooseImageBy.upload}
        />
        <RadioField
          className="btn join-item btn-sm"
          name="chooseImageBy"
          value={ChooseImageBy.url}
          aria-label={ChooseImageBy.url}
        />
        <RadioField
          className="btn join-item btn-sm"
          name="chooseImageBy"
          value={ChooseImageBy.search}
          aria-label={ChooseImageBy.search}
        />
      </Form>
      <ImageInput chooseImageBy={coverForm.watch('chooseImageBy')} />
    </>
  )
}

const ImageInput = ({ chooseImageBy }: CoverImage) => {
  switch (chooseImageBy) {
    case ChooseImageBy.search:
    case ChooseImageBy.url:
      return (
        <RakTextField
          name="coverImage"
          placeholder="Masukkan URL gambar"
          leftAdornment={<span>URL</span>}
        />
      )
    case ChooseImageBy.upload:
      return (
        <FileField
          name="coverImage"
          className="file-input file-input-bordered"
        />
      )
  }
}

export default CoverImageField
