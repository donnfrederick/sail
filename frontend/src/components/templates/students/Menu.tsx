import Footer from 'components/molecules/students/Footer'
import MenuList, { Item } from 'components/molecules/students/MenuList'
import Header from 'components/organisms/students/header'
import Signout from 'components/organisms/students/signout'
import clearInfo from 'hocs/clearInfo'
import * as React from 'react'
import styled from 'styled-components'
import isWebView from 'utils/isWebView'
import resolvePath from 'utils/resolvePath'
import { FormattedMessage } from 'react-intl'

export default clearInfo(() => {
  return (
    <Container>
      <MenuList items={accountItems} subHeading="Account" marginBottom={48} />
      <FormattedMessage id="menu.support" defaultMessage="Support">
        {chunks => (
          <MenuList
            items={supportItems}
            subHeading={chunks ? chunks[0] : 'Support'}
            marginBottom={48}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="menu.legal" defaultMessage="Legal">
        {chunks => (
          <MenuList
            items={legalItems}
            subHeading={chunks ? chunks[0] : 'Legal'}
            marginBottom={48}
          />
        )}
      </FormattedMessage>
      <FormattedMessage id="menu." defaultMessage="About">
        {chunks => (
          <MenuList
            items={aboutItems}
            subHeading={chunks ? chunks[0] : 'About'}
            marginBottom={48}
          />
        )}
      </FormattedMessage>
      <Signout />
      <FormattedMessage id="templates.Menu.Header" defaultMessage="Menu">
        {chunks => (
          <Header
            text={chunks}
            hasBackButton={true}
            returnPath={resolvePath.page('students', 'mypage')}
          />
        )}
      </FormattedMessage>

      <Footer />
    </Container>
  )
})

const accountItems: Item[] = [
  {
    intlid: 'menu.my_page',
    link: resolvePath.page('students', 'profile'),
    text: 'My Page'
  },
  {
    intlid: 'menu.edit_profile',
    link: resolvePath.page('students', 'profile/edit/info'),
    text: 'Edit Profile'
  },
  {
    intlid: 'menu.change_password',
    link: resolvePath.page('students', 'profile/edit/password'),
    text: 'Change Password'
  }
]

const supportItems: Item[] = [
  {
    intlid: 'menu.help_center',
    link: resolvePath.page('students', 'faq'),
    text: 'Help Center'
  },
  {
    intlid: 'menu.conversation_history',
    link: resolvePath.page('students', 'history'),
    text: 'Conversation History'
  },
  {
    intlid: 'menu.favorites_users',
    link: resolvePath.page('students', 'favorites'),
    text: 'Favorite Japanese'
  },
  {
    intlid: 'menu.blocked_accounts',
    link: resolvePath.page('students', 'blocked'),
    text: 'Blocked Accounts'
  }
]

const legalItems: Item[] = [
  {
    // link: resolvePath.page('students', 'privacy'),
    intlid: 'menu.privacy_policy',
    link: 'https://www.helte.jp/privacy-policy-en/',
    text: 'Privacy Policy'
  },
  {
    // link: resolvePath.page('students', 'terms'),
    intlid: 'menu.terms',
    link: 'https://www.helte.jp/terms-en/',
    text: 'Terms'
  }
]

if (isWebView()) {
  legalItems.push({
    link: resolvePath.page('students', 'license'),
    text: 'License',
    intlid: 'menu.license'
  })
}

const aboutItems: Item[] = [
  {
    link: resolvePath.page('students', 'about'),
    text: 'Operating Company',
    intlid: 'menu.operating_company'
  }
]

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 152px 0;
`
