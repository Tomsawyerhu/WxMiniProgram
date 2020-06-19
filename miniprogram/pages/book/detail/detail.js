// miniprogram/pages/book/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'homepage',
    starIndex:3,
    readers:1000,
    charpter0:"作者：马尔克斯",
    charpter1:"序章",
    content:["第一章","第二章","第三章"],
    commentVisible:false,
    commentRate:3,
    commentChoice:'a.10岁以下 ',
    actions:[ {
                name: '提交',
                color: '#2d8cf0',
            },
            {
                name: '取消',
                color: 'black'
            }]
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

  comment:function () {
    this.setData({
      commentVisible:true
    })
  },

  handleCommentClick:function ({detail}) {
    const index = detail.index;
    if(index==0){
      //todo提交

    }else if(index==1){
      this.setData({
        commentVisible:false
      })
    }
  },

  onCommentRateChange:function (e) {
    this.setData({
      commentRate:e.detail.index
    })
  },
  
  handleChoiceChange:function (e) {
    this.setData({
      commentChoice:e.detail.value
    })
  }
})