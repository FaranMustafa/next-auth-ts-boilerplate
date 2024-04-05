namespace NodeJS {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
    NEXT_PUBLIC_API_URL: string
    NEXTAUTH_DEBUG: boolean
  }
}
