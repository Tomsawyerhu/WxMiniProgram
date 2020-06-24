// miniprogram/pages/book/user/readingRecord/readingRecord.js

const animateData = {
  'Attention Seekers': ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat'],
  'Bouncing Entrances': ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
  'Bouncing Exits': ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp'],
  'Fading Entrances': ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig'],
  'Fading Exits': ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig'],
  'Flippers': ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'],
  'Lightspeed': ['lightSpeedIn', 'lightSpeedOut'],
  'Rotating Entrances': ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'],
  'Rotating Exits': ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight'],
  'Sliding Entrances': ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight'],
  'Sliding Exits': ['slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight'],
  'Zoom Entrances': ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp'],
  'Zoom Exits': ['zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp'],
  'Specials': ['hinge', 'jackInTheBox', 'rollIn', 'rollOut']
};


Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-06-18',
    animationType: 'animated ' + animateData['Bouncing Entrances'][2],
    recordData: ''

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
    var that = this
    var userApi=require('../../../../api/user.js')
    userApi.default.requestReadRecordAPI(app.globalData.openId, that.data.date).then(function (record) {
      that.setData({
        recordData: record
      })
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

  bindDateChange: function (d) {
    this.setData({
      date: d.detail.value,
      animationType: 'animated ' + animateData['Bouncing Exits'][3],
    })

    let f = () => {
      this.setData({
        animationType: 'animated ' + animateData['Bouncing Entrances'][2],
      })
    }

    var pro = sleep(1500)
    var that=this
    pro.then(function () {
      //请求数据
      var app = getApp()
      var userApi=require('../../../../api/user.js')
      userApi.default.requestReadRecordAPI(app.globalData.openId, that.data.date).then(function (record) {
        that.setData({
          recordData: record
        })
      }).then(f)
    })
  }

})


const sleep = t => {
  return new Promise((resolve) => setTimeout(resolve, t));
}

module.exports = {
  sleep: sleep
}