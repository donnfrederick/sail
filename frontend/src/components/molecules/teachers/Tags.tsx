import * as React from 'react'
import styled from 'styled-components'
import * as SessionsModels from 'models/sessions'
import * as TeachersModels from 'models/teachers'
import * as R from 'ramda'
import $ from 'jquery'

interface Props {
  tags: SessionsModels.Tag[]
  added_tags: SessionsModels.AddedTag[]
  info: TeachersModels.Info
  register(info: TeachersModels.Info): void
  postAddedTag(category: number, name: string, language: string): void
}

export default (props: Props) => {
  const { tags, info, register, postAddedTag, added_tags } = props

  const onClickHandler = (event: any) => {
    const value = event.target.textContent
    const targetTag = R.find(R.propEq('name_jp', value))(tags)
    info.tags = R.contains(targetTag, info.tags)
      ? R.filter(hobbie => !R.equals(targetTag, hobbie), info.tags)
      : info.tags.length >= 0
        ? info.tags.concat(targetTag)
        : info.tags

    register(info)
  }

  const onClickHandlerAdded = (event: any) => {
    const value = event.target.textContent
    const targetTag = R.find(R.propEq('name_jp', value))(added_tags)
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
      postAddedTag(category_id, tag_name, 'name_jp')
    } else {
      console.log('Empty Tag')
    }
  }

  return (
    <Container>
      <Tags>
        <CategorySelect id="category_id" defaultValue={0}>
          <option value={0}>Select Category</option>
          {map_categories.map(map_category => (
            <option value={map_category.id}>{map_category.name_jp}</option>
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
            <Category key={1000 + category.id}>{category.name_jp}</Category>
            {tags.map(
              tag =>
                tag.category_id === category.id ? (
                  <span>
                    <Tag
                      key={2000 + tag.id}
                      data-checked={R.contains(tag, info.tags)}
                      onClick={onClickHandler}
                    >
                      {tag.name_jp}
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
                      {added_tag.name_jp}
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
  font-size: 120%;
  color: #454545;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
