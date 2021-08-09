import * as React from 'react'
import styled from 'styled-components'
import * as SessionsModels from 'models/sessions'
import * as StudentsModels from 'models/students'
import * as R from 'ramda'
import $ from 'jquery'

interface Props {
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  info: StudentsModels.Info
  register(info: StudentsModels.Info): void
  postAddedTag(category: number, name: string, language: string): void
}

export default (props: Props) => {
  const { tags, info, register, postAddedTag, added_tags } = props

  let tag_lang: string

  if (info.country === 'JP') {
    tag_lang = 'name_jp'
  } else if (info.country === 'ID') {
    tag_lang = 'name_indo'
  } else if (info.country === 'VN') {
    tag_lang = 'name_vietnam'
  } else if (info.country === 'CN') {
    tag_lang = 'name_china'
  } else if (info.country === 'TW') {
    tag_lang = 'name_taiwan'
  } else if (info.country === 'IT') {
    tag_lang = 'name_taly'
  } else if (info.country === 'ES') {
    tag_lang = 'name_spain'
  } else if (info.country === 'FR') {
    tag_lang = 'name_france'
  } else {
    tag_lang = 'name_en'
  }

  const onClickHandler = (event: any) => {
    const value = event.target.textContent
    const targetTag = R.find(R.propEq(tag_lang, value))(tags)
    info.tags = R.contains(targetTag, info.tags)
      ? R.filter(hobbie => !R.equals(targetTag, hobbie), info.tags)
      : info.tags.length >= 0
        ? info.tags.concat(targetTag)
        : info.tags

    register(info)
  }

  const onClickHandlerAdded = (event: any) => {
    const value = event.target.textContent
    const targetTag = R.find(R.propEq(tag_lang, value))(added_tags)
    info.added_tags = R.contains(targetTag, info.added_tags)
      ? R.filter(hobbie => !R.equals(targetTag, hobbie), info.added_tags)
      : info.added_tags.length >= 0
        ? info.added_tags.concat(targetTag)
        : info.added_tags

    register(info)
  }

  const map_categories = info.categories

  const addTagHandler = () => {
    const category = $('#category_id').val()
    const category_id = Number(category)
    const tag = $('#tag_name').val()
    const tag_name = '' + tag

    if (category_id !== 0 && tag_name !== '') {
      postAddedTag(category_id, tag_name, tag_lang)
    } else {
      console.log('Empty Tag')
    }
  }

  return (
    <Container>
      <Tags>
        <TagsHeader>Tags</TagsHeader>
        <TagsText>Choose the topics that you are interested in</TagsText>
        <CategorySelect id="category_id" defaultValue={0}>
          <option value={0}>Select Category</option>
          {map_categories.map(map_category => (
            <option value={map_category.id}>
              {info.country === 'JP'
                ? map_category.name_jp
                : info.country === 'ID'
                  ? map_category.name_indo
                  : info.country === 'VN'
                    ? map_category.name_vietnam
                    : info.country === 'CN'
                      ? map_category.name_china
                      : info.country === 'TW'
                        ? map_category.name_taiwan
                        : info.country === 'IT'
                          ? map_category.name_taly
                          : info.country === 'ES'
                            ? map_category.name_spain
                            : info.country === 'FR'
                              ? map_category.name_france
                              : map_category.name_en}
            </option>
          ))}
        </CategorySelect>
        <AddTagInput placeholder="Tag" id="tag_name" />
        <AddTag
          onClick={() => {
            addTagHandler()
          }}
        >
          Add
        </AddTag>
        <InfoText>
          下の趣味・関心以外のものがあればここから追加してください。
        </InfoText>
        {map_categories.map(category => (
          <span>
            <Category key={1000 + category.id}>
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
            {tags.map(
              tag =>
                tag.category_id === category.id ? (
                  <span>
                    <Tag
                      key={2000 + tag.id}
                      data-checked={R.contains(tag, info.tags)}
                      onClick={onClickHandler}
                    >
                      {info.country === 'JP'
                        ? tag.name_jp
                        : info.country === 'ID'
                          ? tag.name_indo
                          : info.country === 'VN'
                            ? tag.name_vietnam
                            : info.country === 'CN'
                              ? tag.name_china
                              : info.country === 'TW'
                                ? tag.name_taiwan
                                : info.country === 'IT'
                                  ? tag.name_taly
                                  : info.country === 'ES'
                                    ? tag.name_spain
                                    : info.country === 'FR'
                                      ? tag.name_france
                                      : tag.name_en}
                    </Tag>
                  </span>
                ) : null
            )}
            {added_tags.map(
              added_tag =>
                added_tag.category_id === category.id ? (
                  <span>
                    <Tag
                      key={3000 + added_tag.id}
                      data-checked={R.contains(added_tag, info.added_tags)}
                      onClick={onClickHandlerAdded}
                    >
                      {info.country === 'JP'
                        ? added_tag.name_jp
                        : info.country === 'ID'
                          ? added_tag.name_indo
                          : info.country === 'VN'
                            ? added_tag.name_vietnam
                            : info.country === 'CN'
                              ? added_tag.name_china
                              : info.country === 'TW'
                                ? added_tag.name_taiwan
                                : info.country === 'IT'
                                  ? added_tag.name_taly
                                  : info.country === 'ES'
                                    ? added_tag.name_spain
                                    : info.country === 'FR'
                                      ? added_tag.name_france
                                      : added_tag.name_en}
                    </Tag>
                  </span>
                ) : null
            )}
          </span>
        ))}
      </Tags>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 624px;
  margin: 0 auto 80px;
  text-align: left;
`

const Tags = styled.div`
  padding: 1rem;
  padding-top: 3rem;
  padding-bottom: 0;
  text-align: left;
`

const Category = styled.p`
  font-size: 200%;
  color: #1a96fe;
`

const TagsHeader = styled.h1`
  font-size: 200%;
  color: #00b2ff;
`

const TagsText = styled.p`
  font-size: 120%;
  color: #02014d;
`

const Tag = styled.button`
  display: inline-block;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  border-radius: 40px;
  font-size: 120%;
  margin-right: 5px;
  margin-bottom: 1rem;
  color: #454545;
  border: 5px solid #454545;
  background-color: white;
  &[data-checked='true'] {
    border: 5px solid #1a96fe;
    background-color: #1a96fe;
    color: white;
  }
`

const AddTag = styled.button`
  background: #33ddff;
  color: white;
  font-size: 100%;
  padding: 1rem;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`

const AddTagInput = styled.input`
  width: 25%;
  padding: 1rem;
  font-size: 110%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 1px solid #33ddff;
`
const CategorySelect = styled.select`
  width: 30%;
  padding: 1rem;
  font-size: 100%;
  border-radius: 20px;
  border: 1px solid #33ddff;
`

const InfoText = styled.h1`
  font-size: 200%;
  color: #212121;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
