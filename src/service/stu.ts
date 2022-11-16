import wRequest from './wRequest'
import Stu from '../shared/stu'
import FormValue from '../shared/FormValue'
import offsetParam from '@/shared/offsetParam'

const url = '/api/stu'

export async function fetchStuById(id: string) {
  return await wRequest.get<Stu>({
    url: `${url}/${id}`
  })
}

export async function createStu(data: Stu) {
  return await wRequest.post({ url, data })
}

export async function deleteStu(id: string | undefined) {
  return await wRequest.delete({ url: `${url}/${id!}` })
}

export async function updateStu(data: Stu) {
  return await wRequest.patch({ url, data })
}

export async function searchStu(data: FormValue & offsetParam) {
  return await wRequest.post<{
    data: Stu[]
    count: number
  }>({ url: `${url}/search`, data })
}
