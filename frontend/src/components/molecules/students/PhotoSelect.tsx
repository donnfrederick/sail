import RoundImage from 'components/atoms/RoundImage'
import * as StudentsModels from 'models/students'
import * as React from 'react'
import styled from 'styled-components'
import adjustProfilePicture from 'utils/adjustProfilePicture'
import resolvePath from 'utils/resolvePath'
import { FormattedMessage } from 'react-intl'

interface Props {
  info: StudentsModels.Info
  currentPicture: string
  label?: string
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { info, currentPicture, label, register } = props
  const [isImageSelected, setIsImageSelected] = React.useState<boolean>(
    !!info.picture.length
  )

  const adjustProfilePictureCallback = (base64Image: string) => {
    info.picture = base64Image
    register(info)
  }

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!(event.target.files && event.target.files.length)) {
      return
    }
    setIsImageSelected(true)
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const src = reader.result as string
      info.picture = src
      adjustProfilePicture(info.picture, false, adjustProfilePictureCallback)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    adjustProfilePicture(info.picture, true, adjustProfilePictureCallback)
  }

  return (
    <ChangeProfilePhoto>
      <ChangeProfilePhotoLabel size={size} htmlFor="file">
        <RoundImage
          key={info.picture}
          src={
            info.picture ||
            currentPicture ||
            resolvePath.image('common/user@3x.png')
          }
          size={size}
          badge="camera"
          code="camera"
        />
        <FormattedMessage id="edit.profile_picture">
          {chunks => (
            <Text>
              {label || (chunks ? chunks[0] : 'Change Profile Photo')}
            </Text>
          )}
        </FormattedMessage>
        <RotateSettingImage
          src={resolvePath.image('common/picture-rotate@2x.png')}
          onClick={handleClick}
          isActive={isImageSelected}
        />
      </ChangeProfilePhotoLabel>
      <Input type="file" id="file" accept="image/*" onChange={previewImage} />
    </ChangeProfilePhoto>
  )
}

const size: number = 128

interface SizeProps {
  size: number
}

interface RotateSettingProps {
  isActive: boolean
}

const ChangeProfilePhoto = styled.div`
  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #bac8d1;
`

const ChangeProfilePhotoLabel = styled<SizeProps, any>('label')`
  position: relative;
  height: ${props => props.size}px;
  display: flex;
  align-items: center;
  width: 100%;
`

const RotateSettingImage = styled<RotateSettingProps, any>('img')`
  display: ${props => (props.isActive ? 'block' : 'none')};
  position: absolute;
  right: 0;
  width: 75px;
`

const Text = styled.div`
  margin-left: 48px;
  font-size: 28px;
  font-weight: 500;
  color: #8394a0;
`

const Input = styled.input`
  display: none;
`
