// miniprogram/pages/book/shelf/shelf.js
import index from '../../../api/index'
const leaveAction=['hinge','rotateOut','bounceOutLeft', 'bounceOutRight','rotateOut','zoomOut']
const enterAction=['bounceIn', 'bounceInLeft', 'bounceInRight', 'zoomIn', 'zoomInDown', 'zoomInLeft']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'shelf',
    emoji:"./img/ape1.jpg",
    emojiAnimation:'',
    books:[],
    index1: null,//行数组
    index2: [0,1,2],//列数组
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
    var that=this
      index.shelfBookAPI(app.globalData.openId).then((res)=>{
        
        that.setData({
          books:res.content
        })
        
      }).then((res)=>{
        that.setData({
          //+1保证底边格式
          'index1': [...Array(Math.ceil(this.data.books.length / 3 )).keys()],
          'index2': [...Array(3).keys()]
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
  read:function(e){
    var Index = parseInt(e.currentTarget.dataset.index);
      console.log(this.data.books[Index]);
      var app=getApp()
      app.globalData.activeBookId=this.data.books[Index].id
      wx.navigateTo({
        url:'../read/read',
      })
  },
  delete:function(e){
    var Index=parseInt(e.currentTarget.dataset.index);
    var self=this
    wx.showModal({
      content: '确定删除这本书吗',
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        if (res.confirm) {
          index.deleteShelfAPI(self.data.books[Index].id).then((res)=>{
            self.onShow()
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  handleChange({ detail }) {
    if (detail.key == 'homepage') {
      wx.navigateTo({
        url: '../../book/index/index',
      })
    }else if(detail.key == 'mine'){
      wx.navigateTo({
        url: '../../book/user/user',
      })
    }
  },

  changeEmoji:function () {
    let random=Math.floor(Math.random()*6);
    this.setData({
      emojiAnimation:leaveAction[random]
    })

    var record=require("../user/readingRecord/readingRecord.js")

    let pro=this.sleep(2500)
    console.log(pro)
    pro.then(()=>{
      let random=Math.floor((Math.random()*4)+1);
      let random2=Math.floor(Math.random()*6);
      this.setData({
        emoji:"./img/ape"+String(random)+".jpg",
        emojiAnimation:enterAction[random2]
      })
    })
  },

  showBookInfo:function () {
   wx.navigateTo({
     url: '../../book/detail/detail',
   }) 
  },

  sleep:function(t) {
    return new Promise((resolve) =>  setTimeout(resolve, t));
  }
})

