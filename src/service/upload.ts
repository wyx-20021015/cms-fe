import wRequest from './wRequest'
interface fileBuffer {
  file: Buffer
}
interface filePath {
  filePath: string
}
const url = '/api/upload'
const mdUrl = '/api/upload/md'
const avatarUrl = '/api/upload/avatar'

// ??
export async function uploadAvatar(data: fileBuffer) {
  return await wRequest.post({
    url,
    data
  })
}

export async function fetchAvatar(filePath: string) {
  return await wRequest.get({
    url: `${avatarUrl}/${filePath}`
  })
}

export async function fetchMd(filePath: string) {
  return await wRequest.get<string>({
    url: `${mdUrl}/${filePath}`
  })
}

export async function deleteAvatar(data: filePath) {
  return await wRequest.delete({
    url: avatarUrl,
    data
  })
}
