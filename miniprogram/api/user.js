const requestNotesAPI = function (openId) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/note/getNoteList?openId='+openId, //请求笔记
      method:"GET",
      success: function (res) { 
        console.log(res)
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)//带上错误信息
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
      success: function (res) { 
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.messafe)//带上错误信息
      }
    })
  })

}
const deleteNoteAPI = function (id) {
  return new Promise(function ( resolve,reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/note/deleteNote?id='+id, //删除笔记
      method:"GET",
      success: function (res) { 
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.messaage)//带上错误信息
      }
    })
  })

}
const addNoteAPI = function (openId,title,noteContent) {
  return new Promise(function ( resolve,reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/note/addNote',//添加笔记
      data:{
        'openId':openId,
        'title':title,
        'noteContent':noteContent
      },
      method:"POST",
      success: function (res) { 
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)//带上错误信息
      }
    })
  })
}

const requestReadRecordAPI = function (openId,date) {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://127.0.0.1:8080/api/readingRecord/getRecord?openId='+openId+"&date="+date, //请求阅读记录
      method:"GET",
      success: function (res) { 
        console.log(res)
        let result=res.content
        resolve(result)
      }, 
      fail: function (res) {
        reject(res.message)//带上错误信息
      }
    })
  })
}
export default {
  requestNotesAPI,
  updateNoteAPI,
  deleteNoteAPI,
  addNoteAPI,
  requestReadRecordAPI
}