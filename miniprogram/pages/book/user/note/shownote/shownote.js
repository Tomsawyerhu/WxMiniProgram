// miniprogram/pages/book/user/note/shownote/shownote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ' 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错 今天天气不错',
    originText:'',
    updateDisable: false,
    saveDisable: true,
    cancelDisable: true,
    showExample:false
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

  bindInput:function (e) {
    this.setData({
      text:e.detail.value
    })
    
  },

  update: function () {
    if (!this.data.updateDisable) {
      this.setData({
        updateDisable: true,
        saveDisable: false,
        cancelDisable: false,
        originText:this.data.text
      })
    }

  },

  save: function () {
    if (!this.data.saveDisable) {
      this.setData({
        updateDisable: false,
        saveDisable: true,
        cancelDisable: true
      })
      //todo上传数据
    }


  },

  cancel: function () {
    if (!this.data.cancelDisable) {
      this.setData({
        updateDisable: false,
        saveDisable: true,
        cancelDisable: true,
        text:this.data.originText
      })
    }
  },

  back:function () {
    this.setData({
      showExample:false
    })
  },

  showExample:function () {
    //todo
    //请求某篇note数据
    this.setData({
      showExample:true
    })
  }
})