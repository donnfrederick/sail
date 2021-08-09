import ConversationBalloon from 'components/atoms/ConversationBalloon'
import RoundImage from 'components/atoms/RoundImage'
import NetworkStatus from 'components/atoms/teachers/NetworkStatus'
import RemainingTime from 'components/atoms/teachers/RemainingTime'
import ConversationButtons from 'components/molecules/teachers/ConversationButtons'
// import Topics from 'components/molecules/Topics'
import CloseConversationModal from 'components/organisms/teachers/modal_contents/close_conversation'
import withConversationId from 'hocs/withConversationId'
import * as ConversationModels from 'models/conversation'
import * as React from 'react'
import styled from 'styled-components'
import getPartner from 'utils/getPartner'
import resolvePath from 'utils/resolvePath'
import * as SoraClient from 'utils/SoraClient'
import Chat from 'components/molecules/Chat'
// import { translateTopicToJapanese } from 'utils/translateTopic'

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
  closeModal(): void
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

  // const openConversationCloseModal = () => {
  //   setModalContents(<CloseConversationModal />)
  //   openModal()
  // }

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
            code={partner ? partner.country_code : ''}
          />
          <PartnerName>{partner ? partner.name : null} さん</PartnerName>
        </Partner>
      ) : null}
      {/* {isTopicsOpen ? <Topics topics={topics} /> : null}
      {!isTopicsOpen && currentTopic ? (
        <ConversationBalloon
          text={translateTopicToJapanese(currentTopic)}
          isTopic={true}
        />
      ) : null} */}
      {closeSoon ? (
        <ConversationBalloon text="そろそろお別れの時間です" />
      ) : null}
      {youAreLate ? (
        <ConversationBalloon text="遅刻ですよ！" color="#ff676e" />
      ) : null}
      {isConnecting ? <Connecting>{'接続中...'}</Connecting> : null}
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
  width: 154px;
  height: 246px;
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
  height: 100%;
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
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const Connecting = styled.div`
  position: absolute;
  top: 280px;
  right: 0;
  left: 0;
  width: 200px;
  height: 40px;
  margin: auto;
  font-size: 40px;
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
