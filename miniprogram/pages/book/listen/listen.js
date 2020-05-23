// miniprogram/pages/book/listen/listen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'currentProgress': 0,
    'maxProgress': 600,
    'isPlay': false,
    'desTitle': '<<百年孤独>>第一章',
    'desContent': '朗读者：T.S.',
    'currentProgressFormat': "00:00",
    'maxProgressFormat': "00:00",
    'timer': null,
    'mode': 'loop'
  },
  watch: {
    'currentProgressHandler': function (oldValue, newValue) {
      // console.log("调用")
      this.setData({
        'currentProgressFormat': this.format(this.data.currentProgress)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //监听改变当前进度条
    const watch = require("../../../common/watch.js")
    watch.setWatcher(this)

    //初始化音频播放
    const audioPlay = require("../../../common/audioPlayer.js");
    audioPlay.setBasicInfo({
      'src': "https://bookstorage.oss-cn-hangzhou.aliyuncs.com/video/%E7%99%BE%E5%B9%B4%E5%AD%A4%E7%8B%AC.mp3",
      'length': 418,
      'loop': true
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
    const audioPlay = require("../../../common/audioPlayer.js");
    this.setData({
      'currentProgressFormat': this.format(this.data.currentProgress),
      //显示页面时更新音频时长
      'maxProgress': audioPlay.getBasicInfo().length,
      'maxProgressFormat': this.format(audioPlay.getBasicInfo().length)
    })
    //console.log(this.data.maxProgress)


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

  switchCharpter: function () {

  },

  prePlay: function () {

  },

  play: function () {
    const audioPlay = require("../../../common/audioPlayer.js");
    this.startTimer()
    //这里要注意次序（特殊用例：暂停状态下移动到音频末尾）
    this.jumpTo(this.data.currentProgress)
    this.setData({
      'isPlay': true
    })
    audioPlay.playAudio()
  },

  postPlay: function () {

  },

  pause: function () {
    this.clearTimer()
    this.setData({
      'isPlay': false
    })
    const audioPlay = require("../../../common/audioPlayer.js");
    audioPlay.pauseAudio()
  },

  rePlay: function () {
    const audioPlay = require("../../../common/audioPlayer.js");
    this.setData({
      'currentProgress': 0
    })
    if (this.data.timer == null) {
      this.startTimer()
    }
    audioPlay.replayAudio()
  },

  jumpTo: function (p) {
    const audioPlay = require("../../../common/audioPlayer.js");
    audioPlay.jumpTo(p)
  },

  bindchange: function (e) {
    //console.log(e)
    let newValue = e.detail.value;
    this.setData({
      'currentProgress': newValue
    })
    this.jumpTo(newValue)
  },

  format: function (time) {
    //MM-SS
    return Math.floor(time / 600).toString() + Math.floor(time % 600 / 60).toString() + ":" + Math.floor(time % 600 % 60 / 10).toString() + Math.floor(time % 600 % 60 % 10).toString()
  },

  startTimer: function () {
    //启动计时器
    console.log("timer start")
    if (this.data.currentProgress == this.data.maxProgress) {
      this.data.currentProgress = 0
    }
    if (this.data.maxProgress >= 1) {
      this.setData({
        'isPlay': true
      })
      const t = setInterval(() => {
        if (this.data.currentProgress == this.data.maxProgress - 1) {
          this.setData({
            'currentProgress': 0
          })
          if (this.data.mode != 'loop') {
            //正常模式
            this.clearTimer()
            this.setData({
              'isPlay': false
            })
          } else {
            //循环模式
          }
        } else if (this.data.currentProgress == this.data.maxProgress) {
          if (this.data.mode != 'loop') {
            //正常模式
            this.clearTimer()
            this.setData({
              'isPlay': false
            })
          } else {
            //循环模式
            this.setData({
              'currentProgress': 1
            })
          }
        } else {
          this.setData({
            'currentProgress': this.data.currentProgress + 1
          })
          console.log(this.data.currentProgressFormat)
        }
      }, 1000)

      this.setData({
        'timer': t
      })
    }
  },

  clearTimer: function () {
    if (this.data.timer != null) {
      clearInterval(this.data.timer)
      this.setData({
        'timer': null
      })
    }
  }
})