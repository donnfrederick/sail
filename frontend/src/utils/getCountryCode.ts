import * as LocationsModels from 'models/locations'

export default (countries: LocationsModels.Countries, target: string) => {
  const result = countries.data.find(country => country[0] === target)
  return result ? result[1] : null
}
