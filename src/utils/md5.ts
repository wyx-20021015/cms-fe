import md5 from 'js-md5'
function md5password(password: string) {
  return md5.hex(password)
}

export default md5password
