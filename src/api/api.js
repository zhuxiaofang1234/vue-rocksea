import $axios from './api'

export function login(data) {
  const url = '/api/TokenAuth/Authenticate'
  return $axios.post(url, data)
}
export function getInfo() {
  const url = '/getInfo'
  return $axios.get(url)
}
