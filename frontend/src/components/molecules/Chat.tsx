import React, { useEffect } from 'react'
import ChatMessages from 'components/atoms/ChatMessages'
import ChatBox from 'components/atoms/ChatBox'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import * as ConversationModels from 'models/conversation'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import Typography from '@material-ui/core/Typography'
import { animateScroll } from 'react-scroll'

interface Props {
  chats: any[]
  openChat: () => void
  conversationId: number | null
}

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#002884',
      light: '#757ce8',
      main: '#3f50b5'
    },
    secondary: {
      contrastText: '#000',
      dark: '#ba000d',
      light: '#ff7961',
      main: '#f44336'
    }
  },
  typography: {
    fontSize: 24
  }
})

export default (props: Props) => {
  const { chats, conversationId, openChat } = props

  function scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'messagesArea',
      duration: 300
    })
  }

  useEffect(() => {
    scrollToBottom()
  })

  return (
    <ThemeProvider theme={theme}>
      <Typography style={{ height: 60 }} align="right">
        <IconButton edge="start" onClick={openChat}>
          <CloseRoundedIcon style={{ fontSize: 40 }} />
        </IconButton>
      </Typography>
      <MessageList id="messagesArea">
        {chats.map((m, i) => {
          return <ChatMessages key={i} message={m} />
        })}
      </MessageList>
      <ChatBox conversationId={conversationId} />
    </ThemeProvider>
  )
}

const MessageList = styled.div`
  position: relative;
  width: 100%;
  height: calc(86% - 100px);
  overflow-y: scroll;
  z-index: 10;
`
