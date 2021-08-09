import * as React from 'react'
import styled from 'styled-components'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import * as R from 'ramda'

interface Props {
  categories: SessionsModels.Category[]
  info: TeachersModels.Info
  register(info: TeachersModels.Info): void
}

export default (props: Props) => {
  const { categories, info, register } = props

  const onClickHandler = (event: any) => {
    const value = event.target.textContent
    const targetCategory = R.find(R.propEq('name_jp', value))(categories)
    info.categories = R.contains(targetCategory, info.categories)
      ? R.filter(hobbie => !R.equals(targetCategory, hobbie), info.categories)
      : info.categories.length >= 0
        ? info.categories.concat(targetCategory)
        : info.categories

    register(info)
  }

  return (
    <Container>
      {categories.map(category => (
        <Category
          key={category.id}
          data-checked={R.contains(category, info.categories)}
          onClick={onClickHandler}
        >
          {category.name_jp}
        </Category>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-flow: wrap;
  width: 600px;
  margin: 0 auto 48px;
`

const Category = styled.button`
  appearance: none;
  display: block;
  width: 172px;
  height: 172px;
  box-sizing: border-box;
  padding: 0;
  border: 4px solid #138efd;
  border-radius: 50%;
  outline: none;
  background-color: transparent;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: 0px;
  text-align: center;
  color: #138efd;
  margin-bottom: 2rem;

  &[data-checked='true'] {
    pointer-events: true;
    border: none;
    background-image: linear-gradient(315deg, #2eb1ff, #138efd);
    color: #ffffff;
  }
`
