// eslint-disable-next-line unused-imports/no-unused-imports
import { Session } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface Session {
    token: {
      accessToken: string
      refreshToken: string
      tokenExpires: number
    }
    user: {
      id: number
      email: string
      provider: string
      socialId: string | null
      name: string | null
      company: string | null
      billing_details_city: string | null
      billing_details_country: string | null
      billing_details_name: string | null
      billing_details_state: string | null
      billing_details_street: string | null
      billing_details_zipcode: string | null
      role: {
        id: number
        name: string
      }
      status: {
        id: number
        name: string
      }
      createdAt: string
      updatedAt: string
      deletedAt: string | null
    }
    status: string
    role: {
      id: number
      name: string
      __entity: string
    }
    iat: number
    exp: number
    jti: string
  }
}
