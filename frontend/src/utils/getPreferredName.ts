import * as UserProfileModels from 'models/userProfile'

const FIRST_NAME = 2
const LAST_NAME = 3

export default (user: UserProfileModels.UserProfile, personType: string) => {
  switch (personType) {
    case 'student':
    case 'partner': {
      if (user.preferred_name === FIRST_NAME) {
        return user.name.split(' ')[0]
      } else if (user.preferred_name === LAST_NAME) {
        return user.name.split(' ')[1]
      } else {
        return user.name
      }
    }
    case 'teacher': {
      if (user.preferred_name === FIRST_NAME) {
        return user.name.split(' ')[1]
      } else if (user.preferred_name === LAST_NAME) {
        return user.name.split(' ')[0]
      } else {
        return user.name
      }
    }
    default: {
      return user.name
    }
  }
}
