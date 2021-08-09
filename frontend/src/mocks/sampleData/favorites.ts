import { userProfile as user } from 'mocks/sampleData/userProfile'
import * as FavoritesModels from 'models/favorites'

export const favorites: FavoritesModels.GetFavoritesResponse = {
  meta: {
    current_page: 0,
    per_page: 2,
    previous_page: 1,
    next_page: 3,
    total_pages: 5,
    total_entries: 10
  },
  data: [user]
}

export const favoritedUser = user
