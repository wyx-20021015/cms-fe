import wRequest from './wRequest'
import User from '../shared/user'
import FormValue from '../shared/FormValue'
import offsetParam from '@/shared/offsetParam'

const url = '/user'

export async function fetchUserById(id: string) {
  return await wRequest.get<User>({
    url: `${url}/${id}`
  })
}

export async function createUser(data: User) {
  return await wRequest.post({ url, data })
}

export async function deleteUser(id: string | undefined) {
  return await wRequest.delete({ url: `${url}/${id!}` })
}

export async function updateUser(data: User) {
  console.log('update', data)
  return await wRequest.patch({ url, data })
}

export async function searchUser(data: FormValue & offsetParam) {
  console.log(data, `${url}/search`)
  return await wRequest.post<{
    data: User[]
    count: number
  }>({ url: `${url}/search`, data })
}
