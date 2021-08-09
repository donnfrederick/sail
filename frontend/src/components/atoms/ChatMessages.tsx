import React from 'react'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem'
import Chip from '@material-ui/core/Chip'
import moment from 'moment'
import styled from 'styled-components'

interface Props {
  message: { [key: string]: string }
}

const styles = {
  chip: {
    margin: 4,
    marginBottom: -5
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export default ({ message }: Props) => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={message.user_picture_url} />
        </ListItemAvatar>
        <Chip style={styles.chip} label={message.content} />
        <Time>{moment(message.created_at).format('HH:mm')}</Time>
      </ListItem>
    </List>
  )
}

const Time = styled.div`
  font-size: 8px;
`
