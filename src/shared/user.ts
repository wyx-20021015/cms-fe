type Sex = 'male' | 'female'
type User = {
  avatar: string
  name: string
  major: string
  grade: string
  sex: Sex
  phone: string
  email: string
  _id?: string
}
export default User
