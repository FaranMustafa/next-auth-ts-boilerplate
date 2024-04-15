import CredentialsProvider from 'next-auth/providers/credentials'
import { login, refreshToken } from '@/services/auth'

// interfaces for credentials

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'User', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credentials not provided')
        }
        let loginResponse = await login({
          username: credentials.username,
          password: credentials.password,
        })

        if (loginResponse.status === 200) {
          return {
            id: loginResponse.data.id,
            status: 'success',
            data: loginResponse.data,
          }
        }
        if (loginResponse.status > 200) {
          throw new Error(loginResponse.data.message)
        }

        throw new Error('Login failed')
      },
    }),
  ],
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',
  },
  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
    verifyRequest: '/login', // (used for check email message)
    signUp: '/signup',
  },
  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async session(payload: any) {
      const { token } = payload
      return {
        ...token,
      }
    },
    async jwt(payload: any) {
      const { token: tokenJWT, user: userJWT, account, trigger } = payload

      // TODO: check for user object is the way for it
      // ** this is the way to check if the user is logged in or invoked by the trigger login and creds
      if (trigger === 'signIn' && account.type === 'credentials') {
        let user = userJWT.data
        let status = userJWT.status
        let tokenData = userJWT.data
        let token = {
          accessToken: tokenData.token,
          refreshToken: tokenData.refreshToken,
          tokenExpires: tokenData.tokenExpires,
        }
        let role = user.role

        try {
          return {
            token,
            user,
            status,
            role,
          }
        } catch (error) {
          throw new Error('Error setting up session')
        }
      }

      // TODO: check if the token expired and refresh token
      const shouldRefreshTime = Math.round(
        tokenJWT.token.tokenExpires - 60 * 60 * 1000 - Date.now()
      )

      if (shouldRefreshTime < 0) {
        try {
          let payload = {}
          let headers = {
            'Content-Type': 'application/json',
            Authorization: tokenJWT.token.refreshToken,
          }

          let ResponseTokenRefresh = await refreshToken(payload, headers)
          if (ResponseTokenRefresh.data.status === 'success') {
            let data = ResponseTokenRefresh.data.data
            let token = {
              accessToken: data.token,
              refreshToken: data.refreshToken,
              tokenExpires: data.tokenExpires,
            }
            return {
              ...tokenJWT,
              token,
            }
          }
        } catch (error) {
          throw new Error('Token refresh failed')
        }
      }

      // ** pass the information to the session on normal invocation
      return { ...tokenJWT }
    },
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG || false,
}
