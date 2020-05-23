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

export default {
  addToShelfAPI,
  listBookAPI
}