import * as EvaluationsModels from 'models/evaluations'
import resolvePath from 'utils/resolvePath'

export type EmojiType = 'active' | 'inactive' | 'white'

export default (type: EmojiType): EvaluationsModels.Satisfaction => {
  const imagePathFn = (emojiType: EmojiType) => (smiley: string) =>
    `common/evaluation/smiley_${smiley}_${emojiType}@2x.png`
  const imagePath = imagePathFn(type)
  return {
    1: resolvePath.image(imagePath('humorous')),
    2: resolvePath.image(imagePath('impressed')),
    3: resolvePath.image(imagePath('discovered')),
    4: resolvePath.image(imagePath('fine'))
  }
}
