import InputLabel from 'components/atoms/students/InputLabel'
import Selector from 'components/atoms/students/Selector'
import SelectorArrow from 'components/atoms/students/SelectorArrow'
// import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'

import { useSetLocaleState, useLocaleState } from 'components/organisms/Intl'
import { localStorage as localStorageConstants } from 'constants/index'

// interface Props {
// currentLanguage: string | undefined
// info: StudentsModels.Info
// register(info: StudentsModels.Info): void
// }

// export default (props: Props) => {
export default () => {
  // const { currentLanguage, info, register } = props

  // const defaultLocale: string = currentLanguage || useLocaleState().locale
  const defaultLocale = useLocaleState().locale
  const setLocaleState = useSetLocaleState()

  const options = [
    { text: 'English', value: 'en' },
    { text: 'Indonesian', value: 'id' },
    { text: 'Vietnamese', value: 'vn' },
    { text: '簡体字', value: 'ch' },
    { text: '繁体字', value: 'tw' }
    // { text: 'Browser Default', value: localeState.locale }
  ]

  return (
    <Container>
      <InputLabel text="Language" />
      <Selector
        options={options}
        onChange={(event: any) => {
          const input = event.target.value
          setLocaleState({
            locale: input // 選択された言語のidでlocaleをセットする
          })
          localStorage.setItem(localStorageConstants.DISPLAY_LANGUAGE, input) // 設定を保持するためにlocalStorageにも書き込み
          // info.language = input
          // register(info)
        }}
        defaultValue={defaultLocale}
      />
      <SelectorArrow />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0 96px;
  margin: 0 auto 40px;
`
