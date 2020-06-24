const addToShelfAPI = function (bookIndex) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/shelf',
      method: 'POST',
      data: {
        'bookIndex': bookIndex
      },
      success: function (res) {
        var message = res.data.message
        resolve()
        //todo
      },
      fail: function (res) {
        var message = res.data.message
        reject()
        //todo
      }
    })
  })
}

const listBookAPI = function (type) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/shelf?type=' + type,
      method: 'GET',
      success: function (res) {
        resolve()
        //todo
      },
      fail: function (res) {
        reject()
        //todo
      }
    })
  })
}
const getBookListAPI = function (type,content) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getBookList?type=' + type+'&content='+content,
      method: 'GET',
      success: function (res) {
        console.log(res)
        let result=res.data.content
        resolve(result)
      },
      fail: function (res) {
        reject(res.data)//带上错误信息

      }
    })
  })
}
const getBookAPI = function (id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/book/getBook?id=' + id,
      method: 'GET',
      success: function (res) {
        console.log(res)
        let result=res.data.content
        resolve(result)
      },
      fail: function (res) {
        reject(res.data)//带上错误信息

      }
    })
  })
}
export default {
  addToShelfAPI,
  listBookAPI,
  getBookListAPI,
  getBookAPI
}