const requestPagesAPI = function (book,charpter, line, word) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getCharpterAsPages?book='+book +"&charpter="+ charpter+"&line="+line+"&word="+word, //请求书的某一章节的内容
      method:"GET",
      //headers: {
       // 'Content-Type': 'application/json'
      //},
      success: function (res) { 
        console.log(res)
        let result=res.data.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.data.message)//带上错误信息
      }
    })
  })

}
export default requestPagesAPI