import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Submit } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PasswordField from 'src/components/Form/PasswordField'

const ResetPasswordPage = ({ resetToken }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else setEnabled(true)
    }
    validateToken()
  }, [])

  const passwordRef = useRef<HTMLInputElement>()
  useEffect(() => passwordRef.current.focus(), [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) toast.error(response.error)
    else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />

      <main className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col justify-center py-16">
        <header>
          <header className="text-center ">
            <h1 className="text-h2 pb-2 text-center">Reset Password</h1>
            <p>Masukkan password baru untuk akun kamu.</p>
            <p>Hati-hati jangan lupa lagi ya~</p>
          </header>
        </header>

        <div className="mt-4 flex w-full flex-col items-center text-center">
          <Form
            onSubmit={onSubmit}
            className="form-control mt-3 w-full max-w-md gap-3"
          >
            <PasswordField
              inputRef={passwordRef}
              name="password"
              placeholder="Masukkan password baru"
            />
            <Submit
              className={`btn btn-primary ${!enabled && 'loading'} `}
              disabled={!enabled}
            >
              {!enabled ? 'Loading...' : 'submit'}
            </Submit>
          </Form>
        </div>
      </main>
    </>
  )
}

export default ResetPasswordPage
