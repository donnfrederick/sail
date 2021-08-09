export type Country = string[]

export type Meta = {
  default_country: string
  default_timezone: string
}

export interface Countries {
  data: Country[]
  meta: Meta
}

export interface Timezones {
  data: string[]
  meta: Meta
}
