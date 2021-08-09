import * as path from 'path'

const basePath = '/'
const apiBase = '/api/v1'
const assetBasePath = path.join(basePath, 'assets')

export type UserType = 'teachers' | 'students'

const api = (dirname: string): string => {
  return path.join(apiBase, `${dirname}.json`)
}

const image = (dirname: string): string => {
  return path.join(assetBasePath, 'img', dirname)
}

const page = (userType: UserType, dirname: string = ''): string => {
  return path.join(basePath, userType, dirname)
}

export default {
  api,
  image,
  page
}
