// miniprogram/pages/book/user/note/writenote/writenote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:0,
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app=getApp()
    let cache=app.globalData.noteCache
    if(cache.length>0){
      this.setData({
        value:cache
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getInput:function (value) {
    console.log(value)
    this.setData({
      words:value['detail']['value'].length
    })
  },

  save:function(){
    //保存到全局变量
    var app=getApp()
    app.globalData.noteCache=this.data.value
  },

  upload:function (params) {
    //清空全局变量
    var app=getApp()
    app.globalData.noteCache=''
    //保存到后端 
    //todo
  },

  undo:function () {
    this.setData({
      text:''
    }) 
  },

  back:function () {
    wx.showModal({
      title: '',
      content: '确定结束编辑吗？记得保存哦',
      success (res) {
        if (res.confirm) {
          wx.navigateBack()
        } else if (res.cancel) {
          
        }
      }
    })
   
    
  }
})