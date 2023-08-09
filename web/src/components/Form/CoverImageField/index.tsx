import { FileField, RadioField, UseFormReturn, useForm } from '@redwoodjs/forms'

import { BiBookHeart } from 'react-icons/bi'
import { Book } from 'types/graphql'
import RakLabel from '../Label'
import RakTextField from '../TextField'
import { useEffect } from 'react'
import { useUploadCoverImage } from 'src/hooks/useUploadCoverImage'

interface CoverImageFieldProps
  extends Pick<UseFormReturn<BookInputData, object>, 'watch' | 'setValue'> {
  book: Partial<Book>
}

interface CoverImage
  extends Pick<UseFormReturn<BookInputData, object>, 'setValue'> {
  chooseImageBy: ChooseImageBy
}

export enum ChooseImageBy {
  upload = 'Upload',
  url = 'URL',
  search = 'Search',
}

const CoverImageField = ({ watch, setValue, book }: CoverImageFieldProps) => {
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
      <div className="join my-2">
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
      </div>
      <ImageInput
        chooseImageBy={watch('chooseImageBy') as ChooseImageBy}
        setValue={setValue}
      />
    </>
  )
}

const ImageInput = ({ chooseImageBy, setValue }: CoverImage) => {
  const { uploadStatus, uploadCoverImage } = useUploadCoverImage()

  useEffect(() => {
    if (uploadStatus && uploadStatus.status === 'Success') {
      setValue('coverImage', uploadStatus.coverImage)
    }
  }, [uploadStatus])

  const uploadImage = async (file: File) => uploadCoverImage(file)

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
          accept=".png, .jpg, .jpeg"
          onChange={(e) => uploadImage(e.target.files[0])}
          className="file-input file-input-bordered"
        />
      )
  }
}

export default CoverImageField
