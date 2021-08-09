export interface Me {
  id: number
  auth_token: string
}

export interface SigninRequest {
  email: string
  password: string
  fcm_token?: string
}

export interface User {
  id: number
  name: string
  picture_url: string
  auth_token: string
}
