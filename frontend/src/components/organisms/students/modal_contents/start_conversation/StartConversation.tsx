import RoundImage from 'components/atoms/RoundImage'
import Button from 'components/atoms/students/Button'
// import Stars from 'components/molecules/Stars'
import ModalTextContainer from 'components/molecules/students/ModalTextContainer'
import { localStorage as localStorageConstants } from 'constants/index'
import * as ConversationModels from 'models/conversation'
import * as CustomUrlSchemeModels from 'models/customUrlScheme'
import * as qs from 'qs'
import * as React from 'react'
import { postStartConversation } from 'reducers/conversation'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'
import getPartner from 'utils/getPartner'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'

interface Props {
  conversation: ConversationModels.Conversation
  myId: number
  path: string
  close(): void
}

export default (props: Props) => {
  const { conversation, myId, path, close } = props

  const partner = getPartner(conversation, myId)
  const authToken = getAuthToken()

  return (
    <Container>
      <ModalTextContainer heading={'It is time to start the conversation'} />
      <RoundImage
        src={partner ? partner.picture_url : ''}
        size={176}
        marginBottom={32}
        badge={partner ? (partner.highly_reliable ? 'elder' : null) : null}
        code={partner ? partner.country_code : ''}
      />
      <Name>{partner ? partner.name : ''}</Name>
      {/* <Stars
        score={partner ? partner.evaluate : 0}
        sideMargin={8}
        size={32}
        marginBottom={48}
      /> */}
      <ButtonContainer>
        <Button
          type="green"
          text="Talk"
          link={isWebView() ? '' : resolvePath.page('students', path)}
          onClick={() => {
            close()

            try {
              if (authToken) {
                postStartConversation(authToken, conversation.id)
              }
            } catch (error) {
              // nothing to do
            }

            if (!isWebView()) {
              return
            }

            const params: CustomUrlSchemeModels.Conversation = {
              end_url: `/students/conversations/${conversation.id}/end`,
              partner_name: partner ? partner.name : '',
              partner_photo_url: partner ? partner.picture_url : '',
              redirect_url: `/students/conversations/${
                conversation.id
              }/evaluate`,
              sora_channel_id: conversation.channel_id,
              user_type: 'Student',
              ws_token:
                localStorage.getItem(
                  localStorageConstants.WEB_SOCKET_TOKEN_KEY
                ) || ''
            }

            window.location.href = `sailapp://call?${qs.stringify(params)}`
          }}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Name = styled.div`
  margin-bottom: 12px;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  color: #405766;
`
