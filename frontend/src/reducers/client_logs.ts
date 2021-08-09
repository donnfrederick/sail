import axios from 'axios'
import resolvePath from 'utils/resolvePath'

export const report = (
  type: string,
  data: any,
  authToken: string | null
) => () => {
  const config = authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    : {}
  const request = {
    data: JSON.stringify(data),
    type
  }
  return axios
    .post(resolvePath.api('client_logs'), request, config)
    .then(_ => null)
    .catch(_ => null)
}
