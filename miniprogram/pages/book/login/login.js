// miniprogram/pages/book/login/login.js
import requestOpenIdAPI from '../../../api/login.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('console.log'),
    isHide: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //查看是否授权

    wx.getSetting({

      success: function (res) {

        if (res.authSetting['scope.userInfo']) {

          console.log("用户授权了");

        } else {

          //用户没有授权
          console.log("用户没有授权");

        }

      }

    });


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

  bindGetUserInfo: function (res) {

    if (res.detail.userInfo) {

      //用户按了允许授权按钮

      var that = this;

      // 获取到用户的信息了，打印到控制台上看下

      console.log("用户的信息如下：");

      console.log(res.detail.userInfo);

      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来

      that.setData({

        isHide: false

      });
      var app=getApp();

      app.globalData.userInfo.nickName=res.detail.userInfo.nickName
      app.globalData.userInfo.province=res.detail.userInfo.province
      app.globalData.userInfo.city=res.detail.userInfo.city

      requestOpenIdAPI(res.detail.userInfo.nickName).then(function (openId) {
        var app=getApp()
        app.globalData.openId=openId
      }).then(function () {
        wx.navigateTo({
          url: '../index/index',
        })
      })

    } else {

      //用户按了拒绝按钮

      wx.showModal({

        title: '警告',

        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',

        showCancel: false,

        confirmText: '返回授权',

        success: function (res) {

          // 用户没有授权成功，不需要改变 isHide 的值

          if (res.confirm) {

            console.log('用户点击了“返回授权”');

          }

        }

      });

    }
  }

})