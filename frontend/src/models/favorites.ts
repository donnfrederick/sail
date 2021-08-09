import { UserProfile as User } from 'models/userProfile'

export interface GetFavoritesRequest {
  page?: number
  per_page?: number
}

export interface PostFavoritesRequest {
  user_id: number
}

export interface DeleteFavoritesRequest {
  user_id: number
}

export interface Meta {
  current_page: number
  per_page: number
  previous_page: number | null
  next_page: number | null
  total_pages: number
  total_entries: number
}

export interface GetFavoritesResponse {
  data: User[]
  meta: Meta
}
