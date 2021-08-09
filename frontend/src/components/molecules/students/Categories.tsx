import * as React from 'react'
import styled from 'styled-components'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as R from 'ramda'

interface Props {
  categories: SessionsModels.Category[]
  info: StudentsModels.Info
  register(info: StudentsModels.Info): void
}

export default (props: Props) => {
  const { categories, info, register } = props

  let category_name: string

  if (info.country === 'JP') {
    category_name = 'name_jp'
  } else if (info.country === 'ID') {
    category_name = 'name_indo'
  } else if (info.country === 'VN') {
    category_name = 'name_vietnam'
  } else if (info.country === 'CN') {
    category_name = 'name_china'
  } else if (info.country === 'TW') {
    category_name = 'name_taiwan'
  } else if (info.country === 'IT') {
    category_name = 'name_taly'
  } else if (info.country === 'ES') {
    category_name = 'name_spain'
  } else if (info.country === 'FR') {
    category_name = 'name_france'
  } else {
    category_name = 'name_en'
  }

  const onClickHandler = (event: any) => {
    const value = event.target.textContent
    const targetCategory = R.find(R.propEq(category_name, value))(categories)
    info.categories = R.contains(targetCategory, info.categories)
      ? R.filter(hobbie => !R.equals(targetCategory, hobbie), info.categories)
      : info.categories.length >= 0
        ? info.categories.concat(targetCategory)
        : info.categories

    register(info)
  }

  console.log(info.categories)

  return (
    <Container>
      <Categories>
        <CategoriesHeader>Categories</CategoriesHeader>
        <CategoriesText>
          Choose the topics that you are interested in
        </CategoriesText>
        {categories.map(category => (
          <Category
            key={category.id}
            data-checked={R.contains(category, info.categories)}
            onClick={onClickHandler}
          >
            {info.country === 'JP'
              ? category.name_jp
              : info.country === 'ID'
                ? category.name_indo
                : info.country === 'VN'
                  ? category.name_vietnam
                  : info.country === 'CN'
                    ? category.name_china
                    : info.country === 'TW'
                      ? category.name_taiwan
                      : info.country === 'IT'
                        ? category.name_taly
                        : info.country === 'ES'
                          ? category.name_spain
                          : info.country === 'FR'
                            ? category.name_france
                            : category.name_en}
          </Category>
        ))}
      </Categories>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 624px;
  margin: 0 auto 80px;
  text-align: left;
`

const Categories = styled.div`
  padding: 1rem;
  padding-top: 3rem;
  padding-bottom: 0;
  text-align: left;
`

const CategoriesHeader = styled.h1`
  font-size: 200%;
  color: #00b2ff;
`

const CategoriesText = styled.p`
  font-size: 120%;
  color: #02014d;
`

const Category = styled.button`
  display: inline-block;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 120%;
  margin-top: 1rem;
  margin-right: 5px;
  color: #454545;
  border: 5px solid #454545;
  background-color: white;
  &[data-checked='true'] {
    border: 5px solid #1a96fe;
    background-color: #1a96fe;
    color: white;
  }
`
