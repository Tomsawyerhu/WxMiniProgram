const requestBookAPI = function (bookId) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getBook?id='+bookId,
      method:"GET",
      success: function (res) { 
        console.log(res)
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)
      }
    })
  })

}

const requestPagesAPI = function (bookId,charpter,lines,words) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getChapterAsPages?book='+bookId+"&charpter="+charpter+"&line="+lines+"&word="+words,
      method:"GET",
      success: function (res) { 
        console.log(res)
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)
      }
    })
  })

}

module.exports= {
  'requestBookAPI':requestBookAPI,
  'requestPagesAPI':requestPagesAPI
}