import { useEffect, useRef } from 'react'

import { MdEmail } from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TextField from 'src/components/Form/TextField'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>()
  useEffect(() => emailRef.current.focus(), [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.email)

    if (response.error) toast.error(response.error)
    else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col justify-center py-16">
        <header>
          <h1 className="text-h2 text-center">Lupa password?</h1>{' '}
          <p className="mx-auto max-w-md py-2 text-center">
            Jangan khawatir. Masukkan email kamu di bawah, kami akan kirimkan
            link untuk mengatur ulang password kamu~
          </p>
        </header>

        <div className="mt-6 flex w-full flex-col items-center text-center">
          <div>
            Belum punya akun?{' '}
            <Link to={routes.signup()} className="link link-hover link-primary">
              Daftar di sini~
            </Link>
          </div>
          <Form
            onSubmit={onSubmit}
            className="form-control mt-3 w-full max-w-md gap-3"
          >
            <TextField
              name="email"
              placeholder="Masukkan email"
              inputRef={emailRef}
              validation={{
                required: {
                  value: true,
                  message: 'Harap masukkan email',
                },
              }}
              leftAdornment={
                <span>
                  <MdEmail />
                </span>
              }
            />

            <Submit className="btn btn-primary">Submit</Submit>
          </Form>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
