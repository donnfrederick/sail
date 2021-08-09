import withAccusationReasons from 'hocs/withAccusationReasons'
import * as BlocksModels from 'models/blocks'
import * as ConversationModels from 'models/conversation'
import * as EvaluationsModels from 'models/evaluations'
import * as FavoritesModels from 'models/favorites'
import * as React from 'react'
import styled from 'styled-components'

import ChatQuality from 'components/molecules/evaluation/ChatQuality'
import Favorite from 'components/molecules/evaluation/Favorite'
import JapaneseLevel from 'components/molecules/evaluation/JapaneseLevel'
import Memo from 'components/molecules/evaluation/Memo'
import Opening from 'components/molecules/evaluation/Opening'
import Punctuality from 'components/molecules/evaluation/Punctuality'
import ReportConfirm from 'components/molecules/evaluation/ReportConfirm'
import ReportDetail from 'components/molecules/evaluation/ReportDetail'
import ReportReason from 'components/molecules/evaluation/ReportReason'
import Satisfaction from 'components/molecules/evaluation/Satisfaction'

import { isTeachers } from 'utils/checkUrl'
import getPartner from 'utils/getPartner'

interface Props {
  authToken: string
  conversation: ConversationModels.Conversation | null
  isReportModalOpen: boolean
  myId: number
  type: EvaluationsModels.EvaluationType
  closeReportModal(): void
  openModal(): void
  openReportModal(): void
  postBlocks(
    authToken: string,
    parameters: BlocksModels.PostBlocksRequest
  ): Promise<void>
  patchConversationsEvaluate(
    authToken: string,
    id: number,
    evaluation: EvaluationsModels.Questionnaire
  ): void
  patchConversationsMemo(authToken: string, id: number, memo: string): void
  patchConversationsReport(
    authToken: string,
    id: number,
    parameters: ConversationModels.ReportContentRequest
  ): Promise<void>
  postConversationsEvaluate(
    authToken: string,
    id: number,
    evaluation: EvaluationsModels.Questionnaire
  ): void
  postConversationsMemo(authToken: string, id: number, memo: string): void
  postConversationsReport(
    authToken: string,
    id: number,
    parameters: ConversationModels.ReportContentRequest
  ): Promise<void>
  postFavorites(
    authToken: string,
    parameters: FavoritesModels.PostFavoritesRequest
  ): void
}

export default withAccusationReasons(
  ({
    authToken,
    conversation,
    myId,
    postBlocks,
    patchConversationsEvaluate,
    patchConversationsMemo,
    patchConversationsReport,
    postConversationsEvaluate,
    postConversationsReport,
    postConversationsMemo,
    postFavorites,
    type
  }: Props) => {
    const stepState = React.useState<number>(0)
    const satisfactionState = React.useState<EvaluationsModels.FunUnion>(0)
    const japaneseLevelState = React.useState<EvaluationsModels.AbilityUnion>(0)
    const punctualityState = React.useState<EvaluationsModels.TimeUnion>(0)
    const chatQualityState = React.useState<EvaluationsModels.QualityUnion[]>(
      []
    )
    const memoState = React.useState<string>('')
    const favoriteState = React.useState<boolean>(false)
    const reportReasonState = React.useState<
      ConversationModels.ReportReasonsUnion[]
    >([])
    const reportDetailState = React.useState<string>('')
    const blockState = React.useState<boolean>(false)

    const [step] = stepState
    const [satisfaction] = satisfactionState
    const [punctuality] = punctualityState
    const [chatQuality] = chatQualityState
    const [japaneseLevel] = japaneseLevelState
    const [memo] = memoState
    const [reportReason] = reportReasonState
    const [reportDetail] = reportDetailState
    const [block] = blockState

    React.useEffect(
      () => {
        window.scrollTo(0, 0)
      },
      [step]
    )

    const partner = conversation ? getPartner(conversation, myId) : null
    const hasDoneFn = (key: keyof ConversationModels.ConversationRate<any>) =>
      conversation
        ? !!conversation[key].find(
            (
              conversationEvaluationItem: ConversationModels.ConversationRate<
                typeof key
              >
            ) => conversationEvaluationItem.user_id === myId
          )
        : false

    const apis = {
      evaluate: hasDoneFn('evaluate')
        ? patchConversationsEvaluate
        : postConversationsEvaluate,
      memo: hasDoneFn('memos') ? patchConversationsMemo : postConversationsMemo,
      report: hasDoneFn('reports')
        ? patchConversationsReport
        : postConversationsReport
    }

    const evaluation: EvaluationsModels.Questionnaire = {
      ability: japaneseLevel,
      fun: satisfaction,
      quality: chatQuality,
      time: punctuality
    }

    const onEvalSubmit = async () => {
      if (!conversation) {
        return
      }
      if (Object.values(evaluation).find((val: number) => val === 0)) {
        return
      }
      try {
        await apis.evaluate(authToken, conversation.id, evaluation)
      } catch (error) {
        // tslint:disable-next-line
        console.log(error)
      }
    }

    const onMemoSubmit = async () => {
      if (!conversation) {
        return
      }
      try {
        await apis.memo(authToken, conversation.id, memo)
      } catch (error) {
        // tslint:disable-next-line
        console.log(error)
      }
    }

    const onFavoriteSubmit = async () => {
      if (!partner) {
        return
      }
      try {
        const parameters: FavoritesModels.PostFavoritesRequest = {
          user_id: partner.id
        }
        await postFavorites(authToken, parameters)
      } catch (error) {
        // tslint:disable-next-line
        console.log(error)
      }
    }

    const onBlockSubmit = async () => {
      const submitReport = async () => {
        if (!conversation) {
          return
        }
        try {
          const parameters: ConversationModels.ReportContentRequest = {
            report_detail: reportDetail,
            report_reasons: reportReason
          }
          await apis.report(authToken, conversation.id, parameters)
        } catch (error) {
          // tslint:disable-next-line
          console.error(error)
        }
      }
      const triggerBlock = async () => {
        if (!partner || !block) {
          return
        }
        const parameters: BlocksModels.PostBlocksRequest = {
          user_id: partner.id
        }
        try {
          await postBlocks(authToken, parameters)
        } catch (error) {
          // tslint:disable-next-line
          console.error(error)
        }
      }
      await submitReport()
      await triggerBlock()
    }

    const componentArr = [
      [Opening, { type }],
      [Satisfaction, { satisfactionState }],
      [JapaneseLevel, { japaneseLevelState }],
      [Punctuality, { punctualityState }],
      [ChatQuality, { chatQualityState, onSubmit: onEvalSubmit }],
      [Memo, { memoState, onSubmit: onMemoSubmit }],
      [
        Favorite,
        {
          favoriteState,
          isAlreadyFavorite: partner ? partner.is_favorite : false,
          onSubmit: onFavoriteSubmit
        }
      ],
      [ReportReason, { reportReasonState }],
      [
        ReportDetail,
        {
          blockState,
          isAlreadyBlocked: partner ? partner.is_blocked : false,
          reportDetailState
        }
      ],
      [
        ReportConfirm,
        {
          blockState,
          isAlreadyBlocked: partner ? partner.is_blocked : false,
          onSubmit: onBlockSubmit,
          reportDetailState,
          reportReasonState
        }
      ]
    ]

    return (
      <Container step={step}>
        {componentArr.map((item: any, index: number) => {
          const [Component, componentProps] = item
          return (
            step === index && (
              <Component
                {...componentProps}
                key={index}
                stepState={stepState}
                isTeacher={isTeachers()}
              />
            )
          )
        })}
      </Container>
    )
  }
)

const containerBackgroundColor = (step: number) => `
  ${
    step === 0
      ? 'background-image: linear-gradient(328deg, #2eb1ff, #138efd)'
      : 'background-color: rgb(246, 247, 251)'
  };
`

const Container = styled<{ step: number }, any>('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  padding: 70px 0 250px;
  box-sizing: border-box;
  ${props => containerBackgroundColor(props.step)};
  color: ${props => (props.step === 0 ? 'white' : 'rgb(65, 87, 101)')};
  text-align: center;
`
