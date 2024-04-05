import LoginFormComponent from './components'
import { Suspense } from 'react'

const Login = async () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginFormComponent />
      </Suspense>
    </>
  )
}

export default Login
