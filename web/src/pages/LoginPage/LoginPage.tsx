import { useRef } from 'react'
import { useEffect } from 'react'

import { BiBookHeart } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PasswordField from 'src/components/Form/PasswordField'
import TextField from 'src/components/Form/TextField'
import ThirdPartyProvider from 'src/components/ThirdPartyProvider/ThirdPartyProvider'

const LoginPage = () => {
  const { isAuthenticated, logIn, loading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>()
  useEffect(() => emailRef.current.focus(), [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) toast(response.message)
    else if (response.error) toast.error(response.error.message)
    else toast.success('Welcome back!')
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col justify-center py-16">
        <header>
          <h1 className="text-h1 text-center">
            Selamat Datang di
            <span className="inline-block">
              <BiBookHeart className="inline" />
              Rakbookoo!
            </span>
          </h1>
        </header>

        <div className="mt-8 flex w-full flex-col items-center text-center">
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
            <PasswordField name="password" placeholder="Masukkan password" />

            <Submit
              disabled={loading}
              className={`btn btn-primary ${loading && 'loading'} `}
            >
              {loading ? 'Loading...' : 'masuk'}
            </Submit>

            <div className="self-end text-sm">
              <Link to={routes.forgotPassword()} className="link link-hover">
                Lupa password?
              </Link>
            </div>
          </Form>
          <ThirdPartyProvider {...{ loading }} />
        </div>
      </main>
    </>
  )
}

export default LoginPage
