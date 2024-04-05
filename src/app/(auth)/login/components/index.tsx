const LoginFormComponent = () => {
  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">
          Login
        </span>
        <form className="mb-4" action="/" method="post">
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Username or Email
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Username or Email"
            />
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
              placeholder="Password"
            />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
            Login
          </button>
        </form>
        <a className="text-blue-700 text-center text-sm" href="/login">
          Forgot password?
        </a>
      </div>
    </div>
  )
}

export default LoginFormComponent
