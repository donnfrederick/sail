export const isUnauthorized = (status: number) => status === 401

export const isNotFound = (status: number) => status === 404

export const shouldMoveToTop = (status: number) => {
  return isUnauthorized(status) || isNotFound(status)
}
