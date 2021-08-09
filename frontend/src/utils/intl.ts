import en from 'lang/en.json'
import id from 'lang/id.json'
import vn from 'lang/vn.json'
import ch from 'lang/ch.json'
import tw from 'lang/tw.json'

import { localStorage as localStorageConstants } from 'constants/index'

export const messages = {
  en,
  id,
  vn,
  ch,
  tw
} as const

export type Locale = keyof typeof messages

const localeKey = Object.keys(messages)

const languageCode = navigator.language.split(/[-_]/)[0] || 'en'

const defaultLanguage = localStorage.getItem(
  localStorageConstants.DISPLAY_LANGUAGE
) as Locale

export const browserLocale: Locale =
  defaultLanguage ||
  (localeKey.includes(languageCode) ? (languageCode as Locale) : 'en')
