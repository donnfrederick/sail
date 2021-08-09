import ConversationBalloon from 'components/atoms/ConversationBalloon'
import RoundImage from 'components/atoms/RoundImage'
import NetworkStatus from 'components/atoms/students/NetworkStatus'
import RemainingTime from 'components/atoms/students/RemainingTime'
import ConversationButtons from 'components/molecules/students/ConversationButtons'
import CloseConversationModal from 'components/organisms/students/modal_contents/close_conversation'
import withConversationId from 'hocs/withConversationId'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import resolvePath from 'utils/resolvePath'
import * as SoraClient from 'utils/SoraClient'
import Chat from 'components/molecules/Chat'

interface Props {
  bandwidth: number
  chats: ConversationModels.Chats[]
  closeSoon: boolean
  conversation: ConversationModels.Conversation | null
  conversationMode: ConversationModels.ConversationMode
  currentTopic: string
  isConnecting: boolean
  myId: number
  remainingTime: string
  topics: ConversationModels.Topics
  youAreLate: boolean
  openChat(): void
  openModal(): void
  setModalContents(contents: JSX.Element): void
}

export default withConversationId((props: Props) => {
  const {
    bandwidth,
    chats,
    closeSoon,
    conversation,
    conversationMode,
    // currentTopic,
    isConnecting,
    myId,
    remainingTime,
    // topics,
    youAreLate,
    openModal,
    setModalContents
  } = props

  if (conversation) {
    SoraClient.init(conversation.channel_id)
    SoraClient.connect()
  }

  const [isChatOpen, setIsChatOpen] = React.useState(false)
  const partner = conversation ? getPartner(conversation, myId) : null

  return (
    <Container>
      <RemoteVideoContainer>
        <RemoteVideo id="remote-video" autoPlay={true} playsInline={true} />
      </RemoteVideoContainer>
      <LocalVideoContainer>
        <LocalVideo id="local-video" autoPlay={true} playsInline={true} />
      </LocalVideoContainer>
      <NetworkStatus
        status={bandwidth > 300 ? 'good' : bandwidth > 100 ? 'normal' : 'bad'}
      />
      <RemainingTime remainingTime={remainingTime} />
      {conversationMode === 'soundOnly' ? (
        <Partner>
          <RoundImage
            src={
              partner
                ? partner.picture_url
                : resolvePath.image('common/user.png')
            }
            size={200}
            badge={partner ? (partner.highly_reliable ? 'elder' : null) : null}
            code={partner ? partner.country_code : ''}
          />
          <PartnerName>{partner ? partner.name : null}</PartnerName>
        </Partner>
      ) : null}
      {/* {isChatOpen ? <Topics topics={topics} /> : null}
      {!isChatOpen && currentTopic ? (
        <ConversationBalloon
          text={translateTopicToEnglish(currentTopic)}
          isTopic={true}
        />
      ) : null} */}
      {closeSoon ? (
        <ConversationBalloon text="It is time to say goodbye" />
      ) : null}
      {youAreLate ? (
        <ConversationBalloon text="You are late！" color="#ff676e" />
      ) : null}
      {isConnecting ? <Connecting>{'Connecting...'}</Connecting> : null}
      <ConversationButtons
        conversationMode={conversationMode}
        isChatOpen={isChatOpen}
        openChat={() => setIsChatOpen(!isChatOpen)}
        closeEvent={() => {
          setModalContents(<CloseConversationModal />)
          openModal()
        }}
      />
      <Canvas id="check-stream" />
      {conversation &&
        isChatOpen && (
          <ChatContainer>
            <Chat
              chats={chats}
              conversationId={conversation.id}
              openChat={() => setIsChatOpen(!isChatOpen)}
            />
          </ChatContainer>
        )}
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
`

const LocalVideoContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 148px;
  height: 238px;
  border-radius: 8px;
  overflow: hidden;
`

const LocalVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
`

const RemoteVideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  overflow: hidden;
`

const RemoteVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
`

const Partner = styled.div`
  position: absolute;
  top: 410px;
  left: 0;
  width: 100%;
  text-align: center;
`

const PartnerName = styled.div`
  margin-top: 32px;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
`

const Connecting = styled.div`
  position: absolute;
  top: 280px;
  right: 0;
  left: 0;
  width: 200px;
  height: 32px;
  margin: auto;
  font-size: 32px;
  color: #fff;
`

const Canvas = styled.canvas`
  display: none;
  width: 100%;
  height: 100%;
`

const ChatContainer = styled.div`
  position: absolute;
  background-color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
`
// visibility: ${isChatOpen ? 'visible' : 'hidden'};
