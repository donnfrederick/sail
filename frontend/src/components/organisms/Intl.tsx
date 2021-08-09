import React, {
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { IntlProvider } from 'react-intl'
import { messages, browserLocale, Locale } from 'utils/intl'

export type LocaleState = {
  locale: Locale
}

const initialState: LocaleState = {
  locale: browserLocale
}

const IntlStateContext = React.createContext<LocaleState>(initialState)

const SetLocaleStateContext = React.createContext<
  Dispatch<SetStateAction<LocaleState>>
>(() => {
  // empty block
})

export function useLocaleState() {
  return useContext(IntlStateContext)
}
export function useSetLocaleState() {
  return useContext(SetLocaleStateContext)
}

export function LocaleStateProvider(props: {
  initialState?: LocaleState
  children: React.ReactNode
}) {
  const [state, setState] = useState<LocaleState>(
    props.initialState || initialState
  )
  return (
    <IntlStateContext.Provider value={state}>
      <SetLocaleStateContext.Provider value={setState}>
        {props.children}
      </SetLocaleStateContext.Provider>
    </IntlStateContext.Provider>
  )
}

export const Intl = (props: PropsWithChildren<{}>) => {
  const localeState = useLocaleState()

  return (
    <LocaleStateProvider>
      <IntlProvider
        messages={messages[localeState.locale]}
        locale={localeState.locale}
        defaultLocale="en"
      >
        {props.children}
      </IntlProvider>
    </LocaleStateProvider>
  )
}
