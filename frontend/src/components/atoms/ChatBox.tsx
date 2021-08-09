import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send'
// import resolvePath from 'utils/resolvePath'
// import getAuthToken from 'utils/getAuthToken'
// import axios from 'axios'
// import { animateScroll } from 'react-scroll'

import * as WebSocketClient from '../../utils/WebSocketClient'

interface Props {
  conversationId: number | null
  // setChats: React.Dispatch<React.SetStateAction<any[]>>
}

export default (props: Props) => {
  // const { conversationId, setChats } = props
  const [text, setText] = useState('')

  // function fetchChats(id: number | null) {
  //   const authToken = getAuthToken() || ''
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`
  //     },
  //     params: { id }
  //   }
  //   try {
  //     axios.get(resolvePath.api('chats'), config).then(response => {
  //       setChats(response.data)
  //     })
  //   } catch {
  //     // Do nothing
  //   }
  // }

  function postChat(content: string) {
    // const authToken = getAuthToken() || ''
    // const request = { content }
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`
    //   }
    // }

    try {
      WebSocketClient.sendChat(content)
      // axios.post(resolvePath.api('chats'), request, config).then(response => {
      //   setChats(response.data)
      //   animateScroll.scrollToBottom({
      //     containerId: 'messagesArea',
      //     duration: 300
      //   })
      // })
      setText('')
    } catch (error) {
      // Do nothing
    }
  }

  // useEffect(() => {
  //   const chats = setInterval(() => {
  //     fetchChats(conversationId)
  //   }, 10000)
  //   return () => clearInterval(chats)
  // }, [])

  return (
    <InputContainer>
      <Grid container={true} style={{ padding: '10px 20px' }}>
        <Grid item={true} xs={11}>
          <TextField
            label="Message"
            fullWidth={true}
            // rowsMax={4}
            // multiline={true}
            onChange={e => {
              if (e.target.value.length < 100) {
                setText(e.target.value)
              }
            }}
            value={text}
          />
        </Grid>
        <Grid item={true} xs={1}>
          <Fab color="primary" aria-label="add">
            <SendIcon
              onClick={() => {
                if (text.length > 0) {
                  postChat(text)
                }
              }}
            />
          </Fab>
        </Grid>
      </Grid>
      <Button />
    </InputContainer>
  )
}

const InputContainer = styled.div`
  position: absolute;
  background-color: #fff;
  bottom: 0px;
  width: 100%;
  height: 100px;
`
