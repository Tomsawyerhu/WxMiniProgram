// pages/book/read/read.js
import { requestBookAPI, requestPagesAPI, addReadRecordAPI } from "../../../api/read"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pagenum: 0, //页数初始为0
    charpternum: 0,
    line: 15,
    word: 9,
    pages: ["page1", "page2", "page3", "page4"], // 页
    directories: ['a', 'b', 'c'],//目录
    bookId: '',
    bookName: "百年孤独",//书名
    author: "马尔克斯",//作者

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
    showDirectory: false,
    //字体颜色
    pageFontColor: "#000000",
    //书本颜色
    bookColor: "#000000",
    //设置
    showSettings: false,
    //设置-护眼模式开关
    switch: false,
    //设置字体颜色
    currentFontColorValue: 0,
    //设置字体颜色
    currentFontColor: "#000000",
    //设置书本颜色
    currentBookColorValue: 0,
    //设置书本颜色
    currentBookColor: "#000000",
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
    //添加阅读记录
    
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
    var app = getApp()
    requestBookAPI(app.globalData.activeBookId).then((res) => {
      app.globalData.currentBookInfo = res
      this.setData({
        'directories': res.chapters,
        'author': res.bookAuthor,
        'bookName': res.bookName,
        'bookId': res.id
      })
      var data = {
        'action': 'start reading',
        'bookId': this.data.bookId,
        'charpter': this.data.charpternum,
        'page': this.data.pagenum
      }
      this.uploadReadRecord(data)
    }).catch((res) => {
      console.log("错误信息：" + res)
    })


    //加载第一章
    requestPagesAPI(app.globalData.activeBookId, 1, this.data.line, this.data.word).then((data) => {
      this.setData({
        pages: data,
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //添加阅读记录
    var data = {
      'action': 'finish reading',
      'bookId': this.data.bookId,
      'charpter': this.data.charpternum,
      'page': this.data.pagenum
    }
    this.uploadReadRecord(data)

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //添加阅读记录
    var data = {
      'action': 'finish reading',
      'bookId': this.data.bookId,
      'charpter': this.data.charpternum,
      'page': this.data.pagenum
    }
    this.uploadReadRecord(data)

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
      setTimeout(function () { }, 2001)
      //console.log(this.data.anindex)
      //console.log(e)
    } else {
      console.log('不动')
    }
  },

  toggleLeft: function () {
    this.setData({
      'showDirectory': !this.data.showDirectory
    });
  },
  openSettings: function () {
    this.setData({
      showSettings: true
    });
  },
  handleSettingOk: function () {
    this.setData({
      pageFontColor: this.data.currentFontColor,
      bookColor: this.data.currentBookColor,
      showSettings: false
    })
    if (this.data.switch) {
      wx.setScreenBrightness({
        value: 0.4,
      })
    } else {
      wx.setScreenBrightness({
        value: 0.8,
      })
    }
  },
  handleSettingCancel: function () {
    this.setData({
      showSettings: false
    })
  },
  onSwitchChange(event) {
    const detail = event.detail;
    this.setData({
      'switch': detail.value
    })
    console.log(detail.value)
  },

  //字体颜色滑动条
  bindchange: function (e) {
    //console.log(e)
    let newValue = e.detail.value;
    this.setData({
      'currentFontColorValue': newValue,
      'currentFontColor': '#' + this.formatZero(String(this.ten_to_sixteen(newValue)), 6)
    })
  },

  //书本颜色滑动条
  bindchange2: function (e) {
    //console.log(e)
    let newValue = e.detail.value;
    this.setData({
      'currentBookColorValue': newValue,
      'currentBookColor': '#' + this.formatZero(String(this.ten_to_sixteen(newValue)), 6)
    })
  },

  jumpToListen: function () {
    wx.navigateTo({
      url: '../listen/listen',
    })
  },

  changeCharpter: function (e) {
    var app = getApp()
    console.log("change to charpter" + e.detail);
    requestPagesAPI(app.globalData.activeBookId, e.detail, this.data.line, this.data.word).then((data) => {
      this.setData({
        charpternum: e.detail,
        pages: data,
        pagenum:0
      })
    })
  },

  uploadReadRecord: function (params) {
    let data = params
    var date = new Date();
    var year = date.getFullYear(); //获取当前年份
    var mon = date.getMonth() + 1; //获取当前月份
    var da = date.getDate(); //获取当前日
    var day = date.getDay(); //获取当前星期几
    var h = date.getHours(); //获取小时
    var m = date.getMinutes(); //获取分钟
    var s = date.getSeconds(); //获取秒
    data.date = String(year) + '-' + String(mon) + '-' + String(da) + ' ' + String(h) + ":" + String(m) + ':' + String(s)
    console.log(data)
    var app =getApp()
    addReadRecordAPI(data, app.globalData.openId)
  },

  //十进制转16进制
  ten_to_sixteen: function (number) {
    let a = number.toString(16)
    console.log(a)
    return a
  },
  //左侧补零
  formatZero: function (num, len) {
    if (String(num).length > len) return num;
    return (Array(len).join(0) + num).slice(-len);
  }
})