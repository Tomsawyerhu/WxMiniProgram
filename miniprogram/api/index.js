const addToShelfAPI=function(bookIndex){
  wx.request({
    url: 'http://localhost:8080/shelf',
    method:'POST',
    data:{
      'bookIndex':bookIndex
    },
    success:function(res) {
      var message=res.message
      //todo
    },
    fail:function(res) {
      var message=res.message
      //todo
    }
  })
}

const listBookAPI=function(type) {
  wx.request({
    url: 'http://localhost:8080/shelf?type='+type,
    method:'GET',
    success:function(res) {
      
    },
    fail:function(res) {
      
    }
  })
  
}
export default {addToShelfAPI,listBookAPI}