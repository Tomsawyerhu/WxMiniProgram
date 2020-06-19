// miniprogram/pages/book/user/note/writenote/writenote.js
import  user from "../../../../../api/user"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:0,
    text:'',
    title:'',
    textcache:'',
    titlecache:'',
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
    if(app.globalData.noteCache.length>0){
      this.setData({
        text:app.globalData.noteCache,
        title: app.globalData.noteTitleCache
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

  textgetInput:function (value) {
    console.log(value)
    this.setData({
      textcache:value.detail.value,
      words:value['detail']['value'].length
    })
  },
  titlegetInput:function (value) {
    console.log(value)
    this.setData({
      titlecache:value.detail.value,
    })
  },

  save:function(){
    //保存到全局变量
    var app=getApp()
    app.globalData.noteCache=this.data.textcache
    app.globalData.noteTitleCache=this.data.titlecache
    console.log(app.globalData.noteCache)
  },

  upload:function (params) {
    //清空全局变量
    var app=getApp()
    app.globalData.noteCache=''
    app.globalData.noteTitleCache=''
    user.addNoteAPI(app.globalData.openId,this.data.titlecache,this.data.textcache)
    this.setData({
      text:'',
      title:'',
      textcache:'',
      titlecache:'',
      words:0
    })
    //保存到后端 
    //todo
  },

  undo:function () {
    this.setData({
      text:'',
      title:'',
      textcache:'',
      titlecache:'',
      words:0
    }) 
  },

  back:function () {
    wx.showModal({
      content: '确定结束编辑吗？记得保存哦',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success :function  (res) {
        if (res.confirm) {
          wx.navigateBack()
        } else if (res.cancel) {
          
        }
      }
    })
  }
})