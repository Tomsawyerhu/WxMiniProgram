const requestNotesAPI = function (openId) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/note/getNoteList?openId='+openId, //请求笔记
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
const updateNoteAPI = function (id,content) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/note/updateNote?id='+id+"&content="+ content, //修改笔记
      method:"GET",
      //headers: {
       // 'Content-Type': 'application/json'
      //},
      success: function (res) { 
        let result=res.data.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.data.message)//带上错误信息
      }
    })
  })

}
const deleteNoteAPI = function (id) {
  return new Promise(function ( resolve,reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/note/deleteNote?id='+id, //删除笔记
      method:"GET",
      //headers: {
       // 'Content-Type': 'application/json'
      //},
      success: function (res) { 
        let result=res.data.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.data.message)//带上错误信息
      }
    })
  })

}
export default {requestNotesAPI,
  updateNoteAPI,
  deleteNoteAPI,
}