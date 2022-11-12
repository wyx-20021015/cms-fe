import wRequest from './wRequest'
import User from '../shared/user'
import FormValue from '../shared/FormValue'

const url = '/user'

// interface offsetProps {
//   offset: number
//   limit: number | null
// }

// export async function fetchUser(data: offsetProps) {
//   return await wRequest.get<User[]>({ url, data })
// }
export async function fetchUser() {
  return await wRequest.get<User[]>({
    url,
    data: { offset: null, limit: null }
  })
}

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
  return await wRequest.patch({ url, data })
}

export async function searchUser(data: FormValue) {
  console.log(data, `${url}/search`)
  return await wRequest.post<User[]>({ url: `${url}/search`, data })
}
