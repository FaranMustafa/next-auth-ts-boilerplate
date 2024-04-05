import { ApiClient } from '.'

interface ILogin {
  username: string
  password: string
  expiresInMins?: number // optional
}

interface IUserInfoHeaders {
  Authorization: string
  // you can add more headers here
}

interface IRefreshTokenHeaders {
  'Content-Type': string
  Authorization: string
}

interface IRefreshTokenBody {
  expiresInMins?: number
}

export const login = (payload: ILogin) => {
  return ApiClient.post(`/auth/login`, payload, {})
}
export const getUserInfo = (headers: IUserInfoHeaders) => {
  return ApiClient.get(`/auth/me`, headers)
}

export const refreshToken = (
  payload: IRefreshTokenBody,
  headers: IRefreshTokenHeaders
) => {
  console.log('refreshToken', payload, headers)
  return ApiClient.post(`/auth/refresh`, payload, headers)
}
