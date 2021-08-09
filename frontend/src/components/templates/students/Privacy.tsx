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
          'This application, running on a web browser and smartphone through the internet, serves the video chat and conversation with other registered users, provided by Helte co., ltd.\nThe company has established the following personal information protection policy. The company has created an arrangement for the protection of personal information, and makes sure that our initiative to ensure that all employees understand the importance of protecting personal information is strongly enforced. It is through the implementation of this policy that we protect your personal information.'
        }
      />
      {contents.map(content => (
        <div key={content.heading}>
          <SupportHeading text={content.heading} />
          <SupportParagraph text={content.text} urls={content.urls} />
        </div>
      ))}
      <Header text="Privacy Policy" hasBackButton={true} />
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
    heading: `Personal Information Management`,
    text: `The company will keep customer personal information that is accurate and reflective of their current situation. The company has taken the necessary measures to prevent illegal access to personal information, lose of information, damage, falsification, illegal disclosure, etc., including maintaining a security system, establishing a management system, thorough enforcement of employee education, etc.`
  },
  {
    heading: `Purpose of Using Personal Information`,
    text: `When you register an account for this application, your (encrypted) email address, (encrypted) password, local timezone etc. may be recorded. We will not use this information outside of its intended use. The personal information you have given us will be used in identification or email or sending materials for contact from us, business information, and to answer your questions.`
  },
  {
    heading: `Contents`,
    text: `This application requires and provides User information to run the service properly and comfortably.\n･ Email address (encrypted)\n･ Password (encrypted)\n･ Phone number\n･ Country\n･ Local timezone\n･ User photo\n･ Gender\n･ Language speaking level\n･ Conversation topics\n･ History of conversation (optional)\n･ Conversation schedule (optional)\n\nEach content should be appropriate for the purpose of this service - conversation. User may not pretend another existing person or not attempt to harm people.\n\nAny improper contents will be deleted or nullified without warning in advance.\n\nIf you find your data property is used by another user, please notify us by email written at the very bottom of this page.`
  },
  {
    heading: `Release of personal information to third parties; prohibition of program`,
    text: `The company will manage the personal information you provided to us in a appropriate manner. With the exclusion of cases corresponding to the following conditions, the company will not release your personal information to third parties.`
  },
  {
    heading: `Customers have agreed to the sharing of their personal information`,
    text: `In order to carry out services requested by the customer, it is necessary for the company to release information to the contractors it entrusts with relevant operations It is necessary to release information based on current laws and ordinances.`
  },
  {
    heading: `Personal Information Security Measures`,
    text: `The company has taken thorough security measures to guarantee the accuracy as well as security of your personal information.`
  },
  {
    heading: `Personal Inquiry`,
    text: `Requests by an individual to reference, amend, or erase their personal information will be granted upon confirmation of the individual’s identity.`
  },
  {
    heading: `Use of Stripe`,
    text: `We use a third party payment processor, Stripe, for a part of payments. Sail does not store credit card details and instead relies on Stripe for this. \n\nWe use a third party payment processor to process payments made to us. In connection with the processing of such payments, we do not retain any personally identifiable information or any financial information such as credit card numbers. Rather, all such information is provided directly to our third party processor, Stripe, whose use of your personal information is governed by their privacy policy, which may be viewed at the below link.\n\nStripe Privacy Policy: $url_0`,
    urls: [
      {
        href: 'https://stripe.com/us/privacy',
        text: 'https://stripe.com/us/privacy'
      }
    ]
  },
  {
    heading: `Use of Twilio`,
    text: `We use the Twilio API text messaging platform owned by Twilio Inc., 375 Beale Street, Suite 300, San Francisco, CA 94105, USA. Twilio have signed up to covered by the EU-US Privacy Shield framework.\n\nTwilio uses your data in an anonymized form to both improve their services and for statistical purposes. However, Twilio will not use your phone number to call you, or share your number with any third party.\n\nTwilio’s Privacy Policy: $url_0`,
    urls: [
      {
        href: 'https://www.twilio.com/legal/privacy',
        text: 'https://www.twilio.com/legal/privacy'
      }
    ]
  },
  {
    heading: `Use of Google Analytics`,
    text: `This application has integrated the component of Google Analytics to analyze usage situation. Google Analytics is a web analytics service to collect, gather, and analyze data about the behaviour of visitors to Sail. It never include any identifying information in the data, and all those may be owned by Google Inc. To learn more detail about Google Analytics, visit the below URLs accordingly provided by Google Inc.\n\nGoogle Analytics Terms of Service: $url_0\n\nGoogle Analytics Privacy Policy: $url_1`,
    urls: [
      {
        href: 'https://www.google.com/analytics/terms/us.html',
        text: 'https://www.google.com/analytics/terms/us.html'
      },
      {
        href: 'https://www.google.com/intl/en/policies/privacy',
        text: 'https://www.google.com/intl/en/policies/privacy'
      }
    ]
  },
  {
    heading: `Use of Sentry`,
    text: `We are constantly improving and developing our service to provide our users with the best possible customer experience. Therefore, for cases of unexpected errors, we use Sentry, an error tracking tool from Functional Software Inc. (hereinafter “Sentry”). To improve the accessibility and technical stability of our service, we send minimum data about errors to Functional Software Inc., and Functional Software Inc. turns back Helte to analyze the errors. To learn more detail about Sentry, visit the below URL accordingly provided by Functional Software Inc.\n\nSentry Privacy Policy: $url_0`,
    urls: [
      {
        href: 'https://sentry.io/privacy/',
        text: 'https://sentry.io/privacy/'
      }
    ]
  },
  {
    heading: `Compliance with Laws, Ordinances, and Standards and Revision`,
    text: `With concern to the personal information this company has, to go along with and adhere to the laws and ordinances adopted by Japan and other standards, the company may revise the current policy content in efforts to improve the policy.`
  },
  {
    heading: `About service`,
    text: `Company contact and service information are written in the company page.`
  },
  {
    heading: `Inquires`,
    text: `For inquiries concerning the company’s handling of personal information, please contact us at: $url_0.`,
    urls: [
      {
        href: 'mailto:support@helte-corp.com',
        text: 'support@helte-corp.com'
      }
    ]
  }
]
