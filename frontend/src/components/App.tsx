import withMe from 'hocs/withMe'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import styled from 'styled-components'
import * as checkUrl from 'utils/checkUrl'
import detectUnsupportedBrowser from 'utils/detectUnsupportedBrowser'
import dynamicLoader from 'utils/dynamicLoader'
import getAuthToken from 'utils/getAuthToken'

// Components
const Loading = dynamicLoader(() => import('components/organisms/loading'))
const Modal = dynamicLoader(() => import('components/organisms/teachers/modal'))
const OrganizationUsers = dynamicLoader(() =>
  import('components/organisms/teachers/organization_users')
)
const Tutorial = dynamicLoader(() => import('components/organisms/tutorial'))
const StudentsAbout = dynamicLoader(() =>
  import('components/pages/students/About')
)
const StudentsPayment = dynamicLoader(() =>
  import('components/pages/students/Payment')
)
const StudentsPaymentMethods = dynamicLoader(() =>
  import('components/pages/students/PaymentMethods')
)
const StudentsBlocked = dynamicLoader(() =>
  import('components/pages/students/Blocked/Index')
)
const StudentsBlockedDetail = dynamicLoader(() =>
  import('components/pages/students/Blocked/Detail')
)
const StudentsConversationsDetail = dynamicLoader(() =>
  import('components/pages/students/Conversations/Detail')
)
const StudentsConversationsEnd = dynamicLoader(() =>
  import('components/pages/students/Conversations/End')
)
const StudentsConversationsEvaluation = dynamicLoader(() =>
  import('components/pages/students/Conversations/Evaluation')
)
const StudentsConversationsIndex = dynamicLoader(() =>
  import('components/pages/students/Conversations/Index')
)
const StudentsConversationsNew = dynamicLoader(() =>
  import('components/pages/students/Conversations/New')
)
const StudentsFaq = dynamicLoader(() => import('components/pages/students/Faq'))
const StudentsIndex = dynamicLoader(() =>
  import('components/pages/students/Index')
)
const StudentsLicense = dynamicLoader(() =>
  import('components/pages/students/License')
)
const StudentsMyPage = dynamicLoader(() =>
  import('components/pages/students/Mypage')
)
const StudentsNotFound = dynamicLoader(() =>
  import('components/pages/students/NotFound')
)
const StudentssNotificationsDetail = dynamicLoader(() =>
  import('components/pages/students/Notifications/Detail')
)
const StudentssNotificationsIndex = dynamicLoader(() =>
  import('components/pages/students/Notifications/Index')
)
const StudentsPasswordRenew = dynamicLoader(() =>
  import('components/pages/students/PasswordRenew')
)
const StudentsPasswordReset = dynamicLoader(() =>
  import('components/pages/students/PasswordReset')
)
const StudentsPrivacy = dynamicLoader(() =>
  import('components/pages/students/Privacy')
)
const StudentsProfileEditInfo = dynamicLoader(() =>
  import('components/pages/students/Profile/EditInfo')
)
const StudentsProfileEditPassword = dynamicLoader(() =>
  import('components/pages/students/Profile/EditPassword')
)
const StudentsProfile = dynamicLoader(() =>
  import('components/pages/students/Profile/Index')
)
const StudentsReservationsDetail = dynamicLoader(() =>
  import('components/pages/students/Reservations/Detail')
)
const StudentsReservationsNew = dynamicLoader(() =>
  import('components/pages/students/Reservations/New')
)
const StudentsMenu = dynamicLoader(() =>
  import('components/pages/students/Menu')
)
const StudentsSignIn = dynamicLoader(() =>
  import('components/pages/students/Signin')
)
const StudentsSignUp = dynamicLoader(() =>
  import('components/pages/students/Signup')
)
const StudentsTerms = dynamicLoader(() =>
  import('components/pages/students/Terms')
)
const StudentsUnsupported = dynamicLoader(() =>
  import('components/pages/students/UnsupportedBrowser')
)
const StudentsRequests = dynamicLoader(() =>
  import('components/pages/students/Requests/Index')
)
const StudentsRequestDetail = dynamicLoader(() =>
  import('components/pages/students/Requests/Detail')
)
const StudentsConversationHistory = dynamicLoader(() =>
  import('components/pages/students/ConversationHistory/Index')
)
const StudentsConversationHistoryDetail = dynamicLoader(() =>
  import('components/pages/students/ConversationHistory/Detail')
)
const StudentsFavorites = dynamicLoader(() =>
  import('components/pages/students/Favorites/Index')
)
const StudentsFavoritesDetail = dynamicLoader(() =>
  import('components/pages/students/Favorites/Detail')
)
const TeachersAbout = dynamicLoader(() =>
  import('components/pages/teachers/About')
)
const TeachersBlocked = dynamicLoader(() =>
  import('components/pages/teachers/Blocked/Index')
)
const TeachersBlockedDetail = dynamicLoader(() =>
  import('components/pages/teachers/Blocked/Detail')
)
const TeachersConversationsEnd = dynamicLoader(() =>
  import('components/pages/teachers/Conversations/End')
)
const TeachersConversationsEvaluation = dynamicLoader(() =>
  import('components/pages/teachers/Conversations/Evaluation')
)
const TeachersConversationsIndex = dynamicLoader(() =>
  import('components/pages/teachers/Conversations/Index')
)
const TeachersFaq = dynamicLoader(() => import('components/pages/teachers/Faq'))
const TeachersIndex = dynamicLoader(() =>
  import('components/pages/teachers/Index')
)
const TeachersLicense = dynamicLoader(() =>
  import('components/pages/teachers/License')
)
const TeachersMyPage = dynamicLoader(() =>
  import('components/pages/teachers/Mypage')
)
const TeachersNotFound = dynamicLoader(() =>
  import('components/pages/teachers/NotFound')
)
const TeachersNotificationsDetail = dynamicLoader(() =>
  import('components/pages/teachers/Notifications/Detail')
)
const TeachersNotificationsIndex = dynamicLoader(() =>
  import('components/pages/teachers/Notifications/Index')
)
const TeachersOrganizationsSignIn = dynamicLoader(() =>
  import('components/pages/teachers/Organizations/Signin')
)
const TeachersPasswordRenew = dynamicLoader(() =>
  import('components/pages/teachers/PasswordRenew')
)
const TeachersPasswordReset = dynamicLoader(() =>
  import('components/pages/teachers/PasswordReset')
)
const TeachersPrivacy = dynamicLoader(() =>
  import('components/pages/teachers/Privacy')
)
const TeachersProfileEdit = dynamicLoader(() =>
  import('components/pages/teachers/Profile/Edit')
)
const TeachersProfileEditDesiredCondition = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditDesiredCondition')
)
const TeachersProfileEditEmail = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditEmail')
)
const TeachersProfileEditGender = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditGender')
)
const TeachersProfileEditHobbies = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditHobbies')
)
const TeachersProfileEditName = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditName')
)
const TeachersProfileEditPassword = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditPassword')
)
const TeachersProfileEditPicture = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditPicture')
)
const TeachersProfileEditPurposes = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditPurposes')
)
const TeachersProfileEditIntroduce = dynamicLoader(() =>
  import('components/pages/teachers/Profile/EditIntroduce')
)
const TeachersProfile = dynamicLoader(() =>
  import('components/pages/teachers/Profile/Index')
)
const TeachersReservationsIndex = dynamicLoader(() =>
  import('components/pages/teachers/Reservations/Index')
)
const TeachersReservationsDetail = dynamicLoader(() =>
  import('components/pages/teachers/Reservations/Detail')
)
const TeachersReservationsNew = dynamicLoader(() =>
  import('components/pages/teachers/Reservations/New')
)
const TeachersSignIn = dynamicLoader(() =>
  import('components/pages/teachers/Signin')
)
const TeachersSignUp = dynamicLoader(() =>
  import('components/pages/teachers/Signup')
)
const TeachersSupport = dynamicLoader(() =>
  import('components/pages/teachers/Support')
)
const TeachersTerms = dynamicLoader(() =>
  import('components/pages/teachers/Terms')
)
const TeachersUnsupported = dynamicLoader(() =>
  import('components/pages/teachers/UnsupportedBrowser')
)
const TeachersRequests = dynamicLoader(() =>
  import('components/pages/teachers/Requests/Index')
)
const TeachersRequestDetail = dynamicLoader(() =>
  import('components/pages/teachers/Requests/Detail')
)
const TeachersRequestDetailUser = dynamicLoader(() =>
  import('components/pages/teachers/Requests/UserDetail')
)
const TeachersConversationHistory = dynamicLoader(() =>
  import('components/pages/teachers/ConversationHistory/Index')
)
const TeachersConversationHistoryDetail = dynamicLoader(() =>
  import('components/pages/teachers/ConversationHistory/Detail')
)
const TeachersFavorites = dynamicLoader(() =>
  import('components/pages/teachers/Favorites/Index')
)
const TeachersFavoritesDetail = dynamicLoader(() =>
  import('components/pages/teachers/Favorites/Detail')
)
const Top = dynamicLoader(() => import('components/pages/Top'))

export default hot(module)(
  withMe(() => (
    <Container id="container">
      {detectUnsupportedBrowser()}
      <Switch>
        <Route exact={true} path="/" component={Top} />
        <Route exact={true} path="/students" component={StudentsIndex} />
        <Route
          exact={true}
          path="/students/mypage"
          component={StudentsMyPage}
        />
        <Route
          exact={true}
          path="/students/conversations/:id"
          component={StudentsConversationsIndex}
        />
        <Route
          exact={true}
          path="/students/conversations/detail/:id"
          component={StudentsConversationsDetail}
        />
        <Route
          exact={true}
          path="/students/conversations/:id/end"
          component={StudentsConversationsEnd}
        />
        <Route
          exact={true}
          path="/students/conversations/:id/evaluate"
          component={StudentsConversationsEvaluation}
        />
        <Route
          exact={true}
          path="/students/conversations/new"
          component={StudentsConversationsNew}
        />
        <Route
          exact={true}
          path="/students/reservations/detail/:id"
          component={StudentsReservationsDetail}
        />
        <Route
          exact={true}
          path="/students/reservations/new"
          component={StudentsReservationsNew}
        />
        <Route
          exact={true}
          path="/students/signin"
          component={StudentsSignIn}
        />
        <Route
          exact={true}
          path="/students/signup"
          component={StudentsSignUp}
        />
        <Route
          exact={true}
          path="/students/notifications"
          component={StudentssNotificationsIndex}
        />
        <Route
          exact={true}
          path="/students/notifications/:id"
          component={StudentssNotificationsDetail}
        />
        <Route
          exact={true}
          path="/students/profile"
          component={StudentsProfile}
        />
        <Route exact={true} path="/students/menu" component={StudentsMenu} />
        <Route
          exact={true}
          path="/students/profile/edit/info"
          component={StudentsProfileEditInfo}
        />
        <Route
          exact={true}
          path="/students/profile/edit/password"
          component={StudentsProfileEditPassword}
        />
        <Route exact={true} path="/students/faq" component={StudentsFaq} />
        <Route exact={true} path="/students/terms" component={StudentsTerms} />
        <Route
          exact={true}
          path="/students/privacy"
          component={StudentsPrivacy}
        />
        <Route exact={true} path="/students/about" component={StudentsAbout} />
        <Route
          exact={true}
          path={'/students/payment_methods/' + getAuthToken()}
          component={StudentsPaymentMethods}
        />
        <Route
          exact={true}
          path={'/students/payment/' + getAuthToken()}
          component={StudentsPayment}
        />
        <Route
          exact={true}
          path="/students/blocked"
          component={StudentsBlocked}
        />
        <Route
          exact={true}
          path="/students/blocked/:id"
          component={StudentsBlockedDetail}
        />
        <Route
          exact={true}
          path="/students/license"
          component={StudentsLicense}
        />
        <Route
          exact={true}
          path="/students/password_reset"
          component={StudentsPasswordReset}
        />
        <Route
          exact={true}
          path="/students/password_renew/:token"
          component={StudentsPasswordRenew}
        />
        <Route
          exact={true}
          path="/students/unsupported"
          component={StudentsUnsupported}
        />
        <Route
          exact={true}
          path="/students/requests"
          component={StudentsRequests}
        />
        <Route
          exact={true}
          path="/students/requests/detail/:id"
          component={StudentsRequestDetail}
        />
        <Route
          exact={true}
          path="/students/history"
          component={StudentsConversationHistory}
        />
        <Route
          exact={true}
          path="/students/history/:id"
          component={StudentsConversationHistoryDetail}
        />
        <Route
          exact={true}
          path="/students/favorites"
          component={StudentsFavorites}
        />
        <Route
          exact={true}
          path="/students/favorites/:id"
          component={StudentsFavoritesDetail}
        />
        <Route path="/students" component={StudentsNotFound} />
        <Route exact={true} path="/teachers" component={TeachersIndex} />
        <Route
          exact={true}
          path="/teachers/mypage"
          component={TeachersMyPage}
        />
        <Route
          exact={true}
          path="/teachers/conversations/:id"
          component={TeachersConversationsIndex}
        />
        <Route
          exact={true}
          path="/teachers/conversations/:id/end"
          component={TeachersConversationsEnd}
        />
        <Route
          exact={true}
          path="/teachers/conversations/:id/evaluate"
          component={TeachersConversationsEvaluation}
        />
        <Route
          exact={true}
          path="/teachers/signin"
          component={TeachersSignIn}
        />
        <Route
          exact={true}
          path="/teachers/reservations/"
          component={TeachersReservationsIndex}
        />
        <Route
          exact={true}
          path="/teachers/reservations/detail/:id"
          component={TeachersReservationsDetail}
        />
        <Route
          exact={true}
          path="/teachers/reservations/new"
          component={TeachersReservationsNew}
        />
        <Route
          exact={true}
          path="/teachers/signup"
          component={TeachersSignUp}
        />
        <Route
          exact={true}
          path="/teachers/notifications"
          component={TeachersNotificationsIndex}
        />
        <Route
          exact={true}
          path="/teachers/notifications/:id"
          component={TeachersNotificationsDetail}
        />
        <Route
          exact={true}
          path="/teachers/profile"
          component={TeachersProfile}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit"
          component={TeachersProfileEdit}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/email"
          component={TeachersProfileEditEmail}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/introduce"
          component={TeachersProfileEditIntroduce}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/name"
          component={TeachersProfileEditName}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/gender"
          component={TeachersProfileEditGender}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/picture"
          component={TeachersProfileEditPicture}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/hobbies"
          component={TeachersProfileEditHobbies}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/purposes"
          component={TeachersProfileEditPurposes}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/desired_condition"
          component={TeachersProfileEditDesiredCondition}
        />
        <Route
          exact={true}
          path="/teachers/profile/edit/password"
          component={TeachersProfileEditPassword}
        />
        <Route
          exact={true}
          path="/teachers/organizations/signin"
          component={TeachersOrganizationsSignIn}
        />
        <Route
          exact={true}
          path="/teachers/support"
          component={TeachersSupport}
        />
        <Route exact={true} path="/teachers/faq" component={TeachersFaq} />
        <Route exact={true} path="/teachers/terms" component={TeachersTerms} />
        <Route
          exact={true}
          path="/teachers/privacy"
          component={TeachersPrivacy}
        />
        <Route exact={true} path="/teachers/about" component={TeachersAbout} />
        <Route
          exact={true}
          path="/teachers/blocked"
          component={TeachersBlocked}
        />
        <Route
          exact={true}
          path="/teachers/blocked/:id"
          component={TeachersBlockedDetail}
        />
        <Route
          exact={true}
          path="/teachers/license"
          component={TeachersLicense}
        />
        <Route
          exact={true}
          path="/teachers/password_reset"
          component={TeachersPasswordReset}
        />
        <Route
          exact={true}
          path="/teachers/password_renew/:token"
          component={TeachersPasswordRenew}
        />
        <Route
          exact={true}
          path="/teachers/unsupported"
          component={TeachersUnsupported}
        />
        <Route
          exact={true}
          path="/teachers/requests"
          component={TeachersRequests}
        />
        <Route
          exact={true}
          path="/teachers/requests/detail/:id"
          component={TeachersRequestDetail}
        />
        <Route
          exact={true}
          path="/teachers/requests/detail/:id/users/:user_id"
          component={TeachersRequestDetailUser}
        />
        <Route
          exact={true}
          path="/teachers/history"
          component={TeachersConversationHistory}
        />
        <Route
          exact={true}
          path="/teachers/history/:id"
          component={TeachersConversationHistoryDetail}
        />
        <Route
          exact={true}
          path="/teachers/favorites"
          component={TeachersFavorites}
        />
        <Route
          exact={true}
          path="/teachers/favorites/:id"
          component={TeachersFavoritesDetail}
        />
        <Route path="/teachers" component={TeachersNotFound} />
        <Route component={StudentsNotFound} />
      </Switch>
      {!checkUrl.isSignedOutPage() &&
      checkUrl.isTeachers() &&
      !checkUrl.isConversationPage() ? (
        <OrganizationUsers />
      ) : null}
      <Tutorial />
      <Modal />
      <Loading />
    </Container>
  ))
)

const Container = styled.div`
  position: relative;
  width: 750px;
  min-height: 500px;
  max-height: 1334px;
  margin: 0 auto;
  background-color: #f6f7fb;
  overflow-y: scroll;

  .is-teachers & {
    width: 800px;
  }
  .is-students & {
    width: 750px;
  }
`
