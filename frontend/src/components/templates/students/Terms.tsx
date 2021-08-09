import SupportHeading from 'components/atoms/students/SupportHeading'
import SupportParagraph from 'components/atoms/students/SupportParagraph'
import Header from 'components/organisms/students/header'
import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <SupportParagraph
        text={
          'This application, running on a web browser and smartphone through the internet, serves the video chat and conversation with other registered users, provided by Helte co., ltd.\nAs you register an account for the service, you may be granted you have agreed with these terms. Additionally we keep the terms updated without individual notification.'
        }
      />
      {contents.map(content => (
        <div key={content.heading}>
          <SupportHeading text={content.heading} />
          <SupportParagraph text={content.text} />
        </div>
      ))}
      <Header text="Terms" hasBackButton={true} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 152px 64px;
  text-align: center;
`

const contents = [
  {
    heading: `Qualifications`,
    text: `"User" is one who has agreed with these terms and make sure this application is available according to the local laws. As using the service, User may agree with the terms.`
  },
  {
    heading: `Privacy policy`,
    text: `The company have defined our privacy policy to protect and manage User information properly at Privacy Policy page.\nAs using the service, User may not violate the security intentionally.`
  },
  {
    heading: `Contents`,
    text: `This application requires and provides User information to run the service properly and comfortably.\n･ Email address (encrypted)\n･ Password (encrypted)\n･ Country\n･ Local timezone\n･ User photo\n･ Gender\n･ Language speaking level\n･ Conversation topics\n･ History of conversation (optional)\n･ Conversation schedule (optional)\n\nEach content should be appropriate for the purpose of this service - conversation. User may not pretend another existing person or not attempt to harm people.\n\nAny improper contents will be deleted or nullified without warning in advance.\n\nIf you find your data property is used by another user, please notify us by email written at the very bottom of this page.`
  },
  {
    heading: `Data ownership`,
    text: `A user has ownership of any uploaded data by himself/herself. By uploading the data, the user may be granted as publishing it to the world excluding credential information.\nAlthough, the license of the application is only for using. It requires another license to modify or publish the application. Also, the user never owns other users' data properties by any reasons.`
  },
  {
    heading: `Withdraw of the service`,
    text: `You can withdraw the service by uninstalling the smartphone application or stopping the use, or requesting us to completely stop any further contact.`
  },
  {
    heading: `Disclaimer`,
    text: `We daily afford serving good experiences, however, our responsibilities are feasibly limited.\n･ The application only works with the enough speed of internet connection.\n･ We cannot control the contents of the conversation.\n･ We cannot represent what you want to talk to the opponent.`
  },
  {
    heading: `About service`,
    text: `Company contact and service information are written in company page.`
  }
]
