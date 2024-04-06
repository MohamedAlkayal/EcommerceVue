import axios from 'axios'

export let ax = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
  }
})

export function resetAxiosConfig() {
  ax = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
    }
  })
}
