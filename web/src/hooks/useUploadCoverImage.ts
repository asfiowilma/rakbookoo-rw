import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useUploadCoverImage = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null)
  const { getToken } = useAuth()

  const uploadCoverImage = async (file: File) => {
    const token = await getToken()
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    setIsUploading(true)
    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg']

    if (!file || !acceptedTypes.includes(file.type)) {
      setUploadStatus({ status: 'Failed', message: 'Invalid file type' })
      setIsUploading(false)
      return
    }

    // TODO: Resize and maintain aspect ratio if needed

    // Generate a random UUID v4 for the new filename
    const newFilename = `${uuidv4()}${file.name.substring(
      file.name.lastIndexOf('.')
    )}`

    // Upload the resized image to Supabase storage
    const { error } = await supabase.storage
      .from('book-covers')
      .upload(newFilename, file)

    if (error) {
      setUploadStatus({
        status: 'Failed',
        message: 'Error uploading image to Supabase',
      })
      setIsUploading(false)

      return
    }

    const { publicURL } = await supabase.storage
      .from('book-covers')
      .getPublicUrl(newFilename)

    setUploadStatus({ status: 'Success', coverImage: publicURL })
    setIsUploading(false)
  }

  return { isUploading, uploadStatus, uploadCoverImage }
}

interface UploadStatus {
  status: 'Success' | 'Failed'
  coverImage?: string
  message?: string
}
