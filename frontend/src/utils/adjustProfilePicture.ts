/*
 * rotation 90 deg ccw (-90deg). matrix:
 * a (cos-90) c (-sin-90) e (translateX)
 * b (sin-90) d ( cos-90) f (translateY)
 */

export default (
  base64Image: string,
  isRotation: boolean,
  callback: (adjustedBase64Image: string) => any
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const image = new Image()
  image.src = base64Image
  image.onload = () => {
    const isWidthBigger = image.width > image.height
    const big = isWidthBigger ? image.width : image.height
    const small = isWidthBigger ? image.height : image.width
    canvas.width = small
    canvas.height = small
    let xTranslate
    let yTranslate
    if (isRotation) {
      xTranslate = isWidthBigger ? 0 : -(big - small) / 2
      yTranslate = isWidthBigger ? small + (big - small) / 2 : small
      ctx.transform(0, -1, 1, 0, xTranslate, yTranslate)
    } else {
      xTranslate = isWidthBigger ? -(big - small) / 2 : 0
      yTranslate = isWidthBigger ? 0 : -(big - small) / 2
      ctx.translate(xTranslate, yTranslate)
    }
    ctx.drawImage(image, 0, 0)
    callback(canvas.toDataURL())
  }
}
