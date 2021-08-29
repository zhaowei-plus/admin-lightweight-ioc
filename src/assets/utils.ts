/**
 * 校验图片大小
 *  @param {string} url 图片地址 https://global.uban360.com/sfs/file?digest=fid1067e1c4978385c01d206e14d0b2a3ec&fileType=2
 *  @param {number} width 固定宽度
 *  @param {number} height 固定高度
 *
 *  @return promise
 * */
export const validImgSize = (url, width, height) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      if (width === image.width && height === image.height) {
        resolve(true)
      } else {
        reject({ width: image.width, height: image.height })
      }
    }
  })
