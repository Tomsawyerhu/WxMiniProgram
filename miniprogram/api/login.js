var requestOpenIdAPI=function (userName) {
  return new Promise(function (resolve,reject) {
    console.log(userName)
    wx.request({
      url: 'https://127.0.0.1:8080/api/user/getOpenId?name='+userName,
      method:'GET',
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
  
}()

module.exports={
  ' requestOpenIdAPI': requestOpenIdAPI
}