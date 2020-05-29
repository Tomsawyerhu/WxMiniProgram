// pages/book/read/read.js
import requestPagesAPI from "../../../api/read"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pagenum: 2, //页数初始为0
    line: 20,
    word: 15,
    pages: ["page1", "page2", "page3", "page4"], // 缓存页
    //记录触摸位置
    touchS: [0, 0],
    touchE: [0, 0],
    //当前动画实例
    ani: null,
    //执行动画元素位置
    anindex: -1,
    //顺时针逆时针动画实例
    clockwise: null,
    counterclockwise: null,
    //防止在翻页过程中出现用户滑动操作
    status: "free",
    //左侧目录
    showDirectory:false,
    //字体颜色
    pageFontColor:"#000000",
    //书本颜色
    bookColor:"#000000",
    //设置
    showSettings:false,
    //设置-护眼模式开关
    switch : false,
    //设置字体颜色
    currentFontColorValue:0,
    //设置字体颜色
    currentFontColor:"#000000",
    //设置书本颜色
    currentBookColorValue:0,
    //设置书本颜色
    currentBookColor:"#000000",
  },
 
  animationEnd() {
    //console.log("动画结束")
    let temp = this.data.ani
    this.setData({
      'anindex': -1,
      'ani': null,
      'status': "free"
    })
    if (this.isCounter(temp)) {
      this.setData({
        'pagenum': this.data.pagenum + 1
      })
    } else {
      this.setData({
        'pagenum': this.data.pagenum - 1
      })
    }
    console.log(this.data.pagenum)


  },

  /**
   * 判断旋转类型
   */
  isCounter(animation) {
    return animation.actions[0].animates[0].args[3] < 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var app = getApp()
    var charpterId = options.charpter ? options.charpter : 0 //当前章节
    var bookId = app.globalData.book
    //bookId测试时设为0
    requestPagesAPI("0", charpterId, this.data.line, this.data.word).then((res) => {
      this.setData({
        'pages': res.data.content
      })
    }).catch((res) => {
      console.log("错误码：" + res.data.message)
      //todo
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //初始化动画
    var ani1 = wx.createAnimation({
      delay: 0,
      duration: 2000,
      timingFunction: "ease-in-out",
      transformOrigin: '0 0 0'
    })
    var ani2 = wx.createAnimation({
      delay: 0,
      duration: 2000,
      timingFunction: "ease-in-out",
      transformOrigin: '0 0 0'
    })
    ani1.rotate3d(0, 1, 0, -180).step()
    ani2.rotate3d(0, 1, 0, 0).step()
    this.setData({
      'clockwise': ani2.export(),
      'counterclockwise': ani1.export()
    })
    //console.log(this.data.clockwise) 
    //console.log(this.data.counterclockwise) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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

  /**
   * 滑动翻页
   */
  touchStart: function (e) {
    let x = e.touches[0].pageX
    let y = e.touches[0].pageY
    this.setData({
      'touchS': [x, y]
    })
  },
  touchMove: function (e) {
    let x = e.touches[0].pageX
    let y = e.touches[0].pageY
    this.setData({
      'touchE': [x, y]
    })
  },
  touchEnd: function (e) {
    let start = this.data.touchS
    let end = this.data.touchE
    if (start[0] < end[0] - 100 && this.data.status == "free" && this.data.pagenum >= 1) {
      console.log('右滑')
      this.setData({
        'anindex': this.data.pagenum - 1,
        'ani': this.data.clockwise,
        'status': "busy"
      })
      console.log(this.data.anindex)
      //console.log(e) 
    } else if (start[0] > end[0] + 100 && this.data.status == "free" && this.data.pagenum < this.data.pages.length - 1) {
      console.log('左滑')
      this.setData({
        'anindex': this.data.pagenum,
        'ani': this.data.counterclockwise,
        'status': "busy"
      })
      setTimeout(function () {}, 2001)
      //console.log(this.data.anindex)
      //console.log(e)
    } else {
      console.log('不动')
    }
  },

  toggleLeft:function(){
    this.setData({
        'showDirectory': !this.data.showDirectory
    });
},
openSettings:function(){
  this.setData({
    showSettings: true
});
},
handleSettingOk:function(){
  this.setData({
    pageFontColor:this.data.currentFontColor,
    bookColor:this.data.currentBookColor,
    showSettings:false
  })
  if(this.data.switch){
    wx.setScreenBrightness({
      value: 0.4,
    })
  }else{
    wx.setScreenBrightness({
      value:0.8,
    })
  }
},
handleSettingCancel:function(){
  this.setData({
    showSettings:false
  })
},
onSwitchChange(event){
  const detail = event.detail;
  this.setData({
      'switch' : detail.value
  })
  console.log(detail.value)
},

//字体颜色滑动条
bindchange: function (e) {
  //console.log(e)
  let newValue = e.detail.value;
  this.setData({
    'currentFontColorValue': newValue,
    'currentFontColor':'#'+this.formatZero(String(this.ten_to_sixteen(newValue)),6)
  })
},

//书本颜色滑动条
bindchange2: function (e) {
  //console.log(e)
  let newValue = e.detail.value;
  this.setData({
    'currentBookColorValue': newValue,
    'currentBookColor':'#'+this.formatZero(String(this.ten_to_sixteen(newValue)),6)
  })
},

//十进制转16进制
ten_to_sixteen:function(number){
  let a=number.toString(16)
  console.log(a)
  return a
},
//左侧补零
formatZero:function(num, len) {
  if(String(num).length > len) return num;
  return (Array(len).join(0) + num).slice(-len);
}
})