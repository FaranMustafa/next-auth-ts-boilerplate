'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

// form
import { Formik, Form } from 'formik'
// import * as Yup from 'yup'

// navigation
import { useSearchParams } from 'next/navigation'

interface ILoginFormValues {
  username: string
  password: string
}

const initialLoginForm: ILoginFormValues = {
  username: 'kminchelle',
  password: '0lelplR',
}

const LoginFormComponent = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const errorMessage = searchParams.get('error')
  const successMessage = searchParams.get('success')

  React.useEffect(() => {
    if (errorMessage) {
      alert(
        'error' + 'Login Error' + errorMessage
        // 'Please check your email and password and try again. If you are still having trouble, please contact support.'
      )
    }
    if (successMessage) {
      alert('success' + 'Login Success' + successMessage)
    }
  }, [errorMessage, successMessage])

  const submitLoginForm = async (values: ILoginFormValues) => {
    console.log('values', values)
    try {
      await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: callbackUrl ?? '/',
      })
    } catch (err) {
      console.error('error login form' + JSON.stringify(err))
    }
  }

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Login
        </span>
        <Formik
          initialValues={initialLoginForm}
          // validation schema using yup
          validate={(values) => {
            const errors: Partial<ILoginFormValues> = {}
            if (!values.username) {
              errors.username = 'Required'
            }
            if (!values.password) {
              errors.password = 'Required'
            }
            return errors
          }}
          onSubmit={submitLoginForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Username or Email
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username && (
                  <span className="error-label">{errors.username}</span>
                )}
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="password" className="block text-xs mb-1">
                  Password
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {touched.password && errors.password && (
                  <span className="error-label">{errors.password}</span>
                )}
              </div>
              <button
                disabled={!isValid}
                className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <a className="text-blue-700 text-center text-sm" href="/login">
          Forgot password?
        </a>
      </div>
    </div>
  )
}

export default LoginFormComponent
