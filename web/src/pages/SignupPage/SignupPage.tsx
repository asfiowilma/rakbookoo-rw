import { useRef } from 'react'
import { useEffect } from 'react'

import { BiBookHeart } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PasswordField from 'src/components/Form/PasswordField'
import TextField from 'src/components/Form/TextField'
import ThirdPartyProvider from 'src/components/ThirdPartyProvider/ThirdPartyProvider'

const SignupPage = () => {
  const { isAuthenticated, signUp, loading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>()
  useEffect(() => emailRef.current.focus(), [])

  const onSubmit = async (data) => {
    const { email, password, username } = data
    const response = await signUp({
      email,
      password,
      data: { username },
    })

    if (response.message) toast(response.message)
    else if (response.error) toast.error(response.error.message)
    else toast.success('Welcome!') // user is signed in automatically
  }

  return (
    <>
      <MetaTags title="Signup" />

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

        <div className="mt-8 flex w-full flex-col items-center gap-3 text-center">
          <div>
            Sudah punya akun?{' '}
            <Link to={routes.login()} className="link link-hover link-primary">
              Langsung masuk aja~
            </Link>
          </div>
          <Form
            onSubmit={onSubmit}
            className="form-control w-full max-w-md gap-3"
          >
            <TextField
              name="email"
              placeholder="Masukkan email"
              inputRef={emailRef}
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
              leftAdornment={
                <span>
                  <MdEmail />
                </span>
              }
            />
            <TextField
              name="username"
              placeholder="Masukkan username"
              validation={{
                required: {
                  value: true,
                  message: 'Username is required',
                },
              }}
              leftAdornment={
                <span>
                  <FaUserCircle />
                </span>
              }
            />
            <PasswordField name="password" placeholder="Masukkan password" />

            <Submit
              className={`btn btn-primary ${loading && 'loading'} `}
              disabled={loading}
            >
              {loading ? 'mendaftar' : 'Daftar'}
            </Submit>
          </Form>
          <ThirdPartyProvider {...{ loading }} />
        </div>
      </main>
    </>
  )
}

export default SignupPage
