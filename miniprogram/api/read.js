const requestPagesAPI=function(charpter,line,word){
  var that=this
  wx.request({
    url: 'xxx?charpter='+charpter,//请求书的某一章节的内容
    data:{
      'line':line,//每页多少行
      'word':word//每行多少字
    },//分页要求
    headers:{
      'Content-Type': 'application/json'
    },
    success:function(res){
      
    },
    fail:function (res) {
      
    }
  })
}
export default requestPagesAPI