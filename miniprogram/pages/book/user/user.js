// miniprogram/pages/book/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'mine',
    nickName:'',
    profileUrl:'',

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
      this.setData({
        profileUrl: app.globalData.profileUrl,
        nickName: app.globalData.nickName
      })

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

  handleChange({ detail }) {
    if (detail.key == 'homepage') {
      wx.navigateTo({
        url: '../../book/index/index',
      })
    }else if(detail.key == 'shelf'){
      wx.navigateTo({
        url: '../../book/shelf/shelf',
      })
    }
  },

  bindAvatarTap:function () {
    var _this = this
    var src=''
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        src=res.tempFilePaths
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.navigateTo({
          url: '../user/chooseAvatar/chooseAvatar?src='+src,
        })
      }
    })

  },

  jumpToWriteNote:function () {
    wx.navigateTo({
      url: '../../book/user/note/writenote/writenote',
    })
  },

  jumpToShowNote:function () {
    wx.navigateTo({
      url: '../../book/user/note/shownote/shownote',
    })
  },

  jumpToReadingRecord:function () {
    wx.navigateTo({
      url: '../../book/user/readingRecord/readingRecord',
    })
  },

  jumpToAboutUs:function () {
    wx.navigateTo({
      url: '../../book/user/aboutUs/aboutUs',
    })
  }



})