import Button from 'components/atoms/teachers/Button'
import SupportHeading from 'components/atoms/teachers/SupportHeading'
import SupportParagraph from 'components/atoms/teachers/SupportParagraph'
import Header from 'components/molecules/teachers/Header'
import { history } from 'components/organisms/Router'
import * as React from 'react'
import styled from 'styled-components'
import getAuthToken from 'utils/getAuthToken'

export default () => {
  return (
    <Container>
      <SupportHeading text="はじめに" />
      <SupportParagraph
        text={
          'プライバシーポリシーとは、株式会社Helteがお客様のデータを守るために行っている要点をまとめたものです。\n\n・お客様のデータは暗号化されています。\n・いつでも変更を申し込めます。\n・サービス以外の目的ではデータを使用しません。'
        }
      />
      <Button
        type="white"
        text="戻る"
        width={344}
        height={112}
        onClick={() => history.goBack()}
      />
      <TermContents>
        <SupportHeading text="本文" />
        <SupportParagraph text="本ウェブサイトは、株式会社 Helte（以下「当社」という）が運営するオンライン・コミュニケーション・サービス（以下「本サービス」という）です。登録ユーザー（以下「ユーザー」という）およびお問い合わせのお客さまの個人情報は、以下の方針に則り厳重な管理を行ないます。" />
        {contents.map(content => (
          <div key={content.text}>
            <SupportHeading text={content.heading} />
            <SupportParagraph text={content.text} urls={content.urls} />
          </div>
        ))}
      </TermContents>
      <Button
        type="white"
        text="戻る"
        width={344}
        height={112}
        onClick={() => history.goBack()}
      />
      <Header
        text="プライバシーポリシー"
        backToHome={getAuthToken() ? true : false}
        backToTop={getAuthToken() ? false : true}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 184px 80px;
  text-align: center;
`

const TermContents = styled.div`
  margin-top: 84px;
`

const contents = [
  {
    heading: '個人情報保護方針',
    text:
      '当社は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。'
  },
  {
    heading: '個人情報の管理',
    text:
      '当社は、ユーザーの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。'
  },
  {
    heading: '個人情報の利用目的',
    text:
      '本ウェブサイトでは、ユーザー登録に、お名前、メールアドレス、生年月日など、お問い合わせのお客さまからはお名前、e-mailアドレス、電話番号等の個人情報をご登録いただく場合がございますが、これらの個人情報はご提供いただく際の目的以外では利用いたしません。\nお預かりした個人情報は、サービスシステムへのログインおよび当社からのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。'
  },
  {
    heading: '個人情報の第三者への開示・提供の禁止',
    text:
      '当社は、お預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。'
  },
  {
    heading: 'お客さまの同意がある場合',
    text:
      'お客さまが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合\n法令に基づき開示することが必要である場合\n個人情報の安全対策 当社は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。'
  },
  {
    heading: 'ご本人の照会',
    text:
      'ユーザーまたはお客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。'
  },
  {
    heading: `Googleアナリティクスについて `,
    text: `本サービスにおいて、お客様のご利用状況を把握するためにGoogle 社のサービスであるGoogleアナリティクスを利用しています。本サービスでGoogleアナリティクスを利用すると、当社が発行するクッキーをもとにして、Google 社がお客様の本サービスのご利用履歴を収集、記録、分析します。当社は、Google 社からその分析結果を受け取り、お客様の本サービスのご利用状況を把握します。Googleアナリティクスにより収集、記録、分析されたお客様の情報には、特定の個人を識別する情報は一切含まれません。また、それらの情報は、Google社により同社のプライバシーポリシーに基づいて管理されます。 Googleアナリティクスの利用規約に関する説明についてはGoogleアナリティクスのサイトを、Google社のプライバシーポリシーに関する説明については同社のサイトをご覧下さい。\n\nGoogle Analyticsの利用規約： $url_0\n\nGoogleのプライバシーポリシー： $url_1`,
    urls: [
      {
        href: 'https://www.google.com/analytics/terms/jp.html',
        text: 'https://www.google.com/analytics/terms/jp.html'
      },
      {
        href: 'https://www.google.com/intl/ja/policies/privacy',
        text: 'https://www.google.com/intl/ja/policies/privacy'
      }
    ]
  },
  {
    heading: `Sentryについて`,
    text: `本サービスにおいて、お客様に安心・安全なサービスを提供し日々改善を行っていくために、Functional Software 社のサービスであるSentryを利用しています。本サービスでSentryを利用すると、本サービスのご利用中に生じたエラーについて必要最低限の情報がSentry社のサーバーに送信されます。当社は、Functional Software 社からその分析結果を受け取り、お客様のエラー状況を把握します。Sentryにより収集、記録、分析されたお客様の情報には、特定の個人を識別する情報は一切含まれません。また、それらの情報は、Functional Software 社により同社のプライバシーポリシーに基づいて管理されます。 Sentryのプライバシーポリシーに関する説明についてはSentryのサイトをご覧下さい。\n\nSentryのプライバシーポリシー： $url_0`,
    urls: [
      {
        href: 'https://sentry.io/privacy/',
        text: 'https://sentry.io/privacy/'
      }
    ]
  },
  {
    heading: '法令、規範の遵守と見直し',
    text:
      '当社は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。'
  },
  {
    heading: 'お問い合せ',
    text:
      '当社の個人情報の取扱に関するお問い合せはお問い合わせ窓口までご連絡ください。'
  }
]
