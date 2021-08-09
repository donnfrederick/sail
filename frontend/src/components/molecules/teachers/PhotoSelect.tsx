import RoundImage from 'components/atoms/RoundImage'
import { Info } from 'models/teachers'
import * as React from 'react'
import styled from 'styled-components'
import adjustProfilePicture from 'utils/adjustProfilePicture'
import isHuawei from 'utils/isHuawei'
import resolvePath from 'utils/resolvePath'

interface Props {
  info: Info
  register(info: Info): void
}

export default (props: Props) => {
  const { info, register } = props
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
      const src = reader.result
      if (!src) {
        return
      }
      info.picture = src as string
      adjustProfilePicture(info.picture, false, adjustProfilePictureCallback)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    adjustProfilePicture(info.picture, true, adjustProfilePictureCallback)
  }

  return (
    <Container>
      <ImageContainer size={size}>
        <RoundImage
          key={info.picture}
          src={info.picture || resolvePath.image('common/user.png')}
          size={size}
          marginBottom={0}
          badge="camera"
          code="camera"
        />
        <RotateSettingImage
          src={resolvePath.image('common/picture-rotate@2x.png')}
          onClick={handleClick}
          isActive={isImageSelected}
        />
      </ImageContainer>
      <Label htmlFor="file">写真を撮る</Label>
      <Input type="file" id="file" accept="image/*" onChange={previewImage} />
    </Container>
  )
}

const size: number = 240

interface SizeProps {
  size: number
}

interface RotateSettingProps {
  isActive: boolean
}

const Container = styled.div`
  width: 560px;
  margin: 0 auto 190px;
`
const ImageContainer = styled<SizeProps, any>('div')`
  position: relative;
  height: ${props => props.size}px;
  margin: 0 auto 62px auto;
`

const RotateSettingImage = styled<RotateSettingProps, any>('img')`
  display: ${props => (props.isActive ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 115px;
`

const Label = styled.label`
  appearance: none;
  display: block;
  width: 528px;
  height: 112px;
  margin: 0 auto;
  padding: 0;
  outline: none;
  border: none;
  border-radius: 56px;
  background-image: linear-gradient(282deg, #2eb1ff, #138efd);
  ${isHuawei()
    ? 'border: 1px solid rgba(5, 68, 102, 0.3)'
    : 'box-shadow: 0 5px 25px -10px rgba(6, 85, 128, 0.75)'};
  font-size: 48px;
  font-weight: 500;
  line-height: 112px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
`

const Input = styled.input`
  display: none;
`
