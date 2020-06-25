// miniprogram/pages/book/index/index.js
import index from '../../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'homepage',
    scrollTop: 0,
    px: ['文学', '历史', '科技', '小说'],
    bookperline: 2,
    books: [],
    booksnum: 0,
    index1: null,//行数组
    index2: null,//列数组
    //分享链接
    share: function (event) {
      console.log("分享")
    },
    //收藏链接
    shelf: function (event) {
      console.log("收藏")
    },
    dailyRecommend: ['文学', '历史', '科技', '小说']


  },

  handleChange({ detail }) {
    if (detail.key == 'shelf') {
      wx.navigateTo({
        url: '../../book/shelf/shelf',
      })
    }else if(detail.key == 'mine'){
      wx.navigateTo({
        url: '../../book/user/user',
      })
    }
  },

  //页面滚动执行方式
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    var app = getApp()

    index.getBookListAPI('').then((res) => {
      that.setData({
        books: res,
        
      })
      that.setData({
        booksnum:this.data.books.length
      })
      that.setData({
        //+1保证底边格式
        'index1': [...Array(Math.ceil(this.data.booksnum / this.data.bookperline + 1)).keys()],
        'index2': [...Array(this.data.bookperline).keys()]
      })
      
    }).catch((res) => {
      //todo
    })

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

  startSearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })

  }
})