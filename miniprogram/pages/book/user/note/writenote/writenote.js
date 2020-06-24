// miniprogram/pages/book/user/note/writenote/writenote.js
import user from "../../../../../api/user"
import Notify from '../../../../../vant/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:0,
    text: '',
    title: '',
    textStyle: { maxHeight: wx.getSystemInfoSync().windowHeight / 3 * 2, minHeight: wx.getSystemInfoSync().windowHeight / 2 }
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
    var app = getApp()
    if (app.globalData.noteCache.length > 0) {
      this.setData({
        text: app.globalData.noteCache,
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

  textgetInput: function (e) {
    console.log(e)
    this.setData({
      text: e.detail,
      word:e.detail.length
    })
  },
  titlegetInput: function (e) {
    console.log(e)
    this.setData({
      title: e.detail,
    })
  },

  save: function () {
    //保存到全局变量
    var app = getApp()
    app.globalData.noteCache = this.data.text
    app.globalData.noteTitleCache = this.data.title
    
    Notify({ type: 'success', message: '暂存成功' });
  },

  upload: function (params) {
    var self=this
    wx.showModal({
      content: '确定上传吗',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
       
        if (res.confirm) {
          //清空全局变量
          var app = getApp()
          app.globalData.noteCache = ''
          app.globalData.noteTitleCache = ''
          user.addNoteAPI(app.globalData.openId, self.data.title, self.data.text)
          self.setData({
            text: '',
            title: '',
            word: 0
          })
          Notify({ type: 'success', message: '上传成功' });
        } else if (res.cancel) {
        }
      }
    })


  },

  undo: function () {
    this.setData({
      text: '',
      title: '',
      word: 0
    })
  },

  back: function () {
    wx.showModal({
      content: '确定结束编辑吗？记得保存哦',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack()
        } else if (res.cancel) {

        }
      }
    })
  }
})