// class API client
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { redirect } from 'next/navigation'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      } else {
        // Handle server-side redirection
        redirect('/login')
      }
    }

    return Promise.reject(error)
  }
)

export class ApiClient {
  static baseUrl = process.env.NEXT_PUBLIC_API_URL
  static async get(path: string, headers = {}) {
    const session = await getSession()
    let config = {
      method: 'get',
      url: this.baseUrl + path,
      headers: {
        // use this for auth is true
        Authorization: `Bearer ${session?.token}`,
        ...headers,
      },
    }
    return axios.request(config)
  }

  static async post(path: string, payload = {}, headers = {}) {
    const session = await getSession()
    const data = payload
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: this.baseUrl + path,
      headers: {
        //check to
        Authorization: `Bearer ${session?.token}`,
        ...headers,
      },
      data: data,
    }
    return axios.request(config)
  }

  static async delete(path: string, payload = {}, headers = {}) {
    const session = await getSession()
    let data = payload
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: this.baseUrl + path,
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
        ...headers,
      },
      data: data,
    }
    return axios.request(config)
  }

  static async put(path: string, payload = {}) {
    const session = await getSession()

    let data = JSON.stringify(payload)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: this.baseUrl + path,
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }
    return axios.request(config)
  }

  static async patch(path: string, payload = {}) {
    const session = await getSession()

    let data = JSON.stringify(payload)
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: this.baseUrl + path,
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }
    return axios.request(config)
  }
}
