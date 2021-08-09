import * as React from 'react'

export interface Url {
  href: string
  text: string
}

export default (text: string, urls?: Url[]) => {
  if (!urls) {
    return text
  }
  return text.split(/\$url_(\d)/).map((textPart, index) => {
    const el = urls[textPart] ? (
      <a href={urls[textPart].href} target="_blank">
        {urls[textPart].text}
      </a>
    ) : (
      textPart
    )
    return <span key={index}>{el}</span>
  })
}
