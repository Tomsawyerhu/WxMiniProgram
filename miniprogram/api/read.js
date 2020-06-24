const requestBookAPI = function (bookId) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getBook?id='+bookId,
      method:"GET",
      success: function (res) { 
        console.log(res)
        let result=res.data.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)
      }
    })
  })

}

const requestPagesAPI = function (bookId,chapter,lines,words) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getChapterAsPages?book='+bookId+"&chapter="+chapter+"&line="+lines+"&word="+words,
      method:"GET",
      success: function (res) { 
        console.log(res)
        let result=res.data.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)
      }
    })
  })

}

const addReadRecordAPI = function (record,openId) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/addReadRecord?openId='+openId,
      method:"POST",
      data:record,
      success: function (res) { 
        console.log(res)
        let result=res.data.content
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
  'requestPagesAPI':requestPagesAPI,
  'addReadRecordAPI':addReadRecordAPI
}