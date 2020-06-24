// miniprogram/pages/book/user/chooseAvatar/chooseAvatar.js
import WeCropper from '../../../../plugin/we-cropper/we-cropper.js';

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth
const height = width

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width, // 画布宽度
      height, // 画布高度
      src: '',
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: width / 2 - 75, // 裁剪框x轴起点
        y: width / 2 - 75, // 裁剪框y轴起点
        width: 150, // 裁剪框宽度
        height: 150 // 裁剪框高度
      }
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      cropperOpt
    } = this.data;
    cropperOpt.src = options.src;


    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => { })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 3000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
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
  onShow: function (options) {

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

  // 插件通过touchStart、touchMove、touchEnd方法来接收事件对象。
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },

  // 生成图片
  getCropperImage() {
    var userApi=require('../../../../api/user.js')
   
    this.cropper.getCropperImage(() => {
      var tempFilePath = this.cropper.src
      // tempFilePath 为裁剪后的图片临时路径
      if (tempFilePath) {
        // 存储图片
        userApi.default.uploadAvatarAPI(tempFilePath).then(function (res) {
          if (res == '上传成功') { alert('上传成功') }
        })

      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },

  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let src = res.tempFilePaths[0]
        // 获取裁剪图片资源后，给data添加src属性及其值
        self.cropper.pushOrign(src)
      }
    })
  },


})