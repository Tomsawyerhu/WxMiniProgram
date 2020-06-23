// miniprogram/pages/book/user/note/shownote/shownote.js
import  user from "../../../../../api/user"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    text: '',
    createDate:'',
    originText:'',
    showDisable:true,
    updateDisable: false,
    saveDisable: true,
    cancelDisable: true,
    showExample:false,
    noteList:[],
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
  onShow: function (options) {
    let that=this
    console.log('1')
    var app = getApp()
    user.requestNotesAPI(app.globalData.openId).then((res) => {
     
      that.setData({
        noteList: res
      })
      if(this.data.noteList.length==0){
     that.setData({
       noteList:  [{
        createDate:'',
        title: '你还没有笔记',
        noteContent:'你还没有笔记',
      }],
      showDisable:false,
     })
    }
    }).catch((res) => {
      //todo
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
    var item = this.data.noteList[this.data.index];
    if (!this.data.saveDisable) {
      this.setData({
        updateDisable: false,
        saveDisable: true,
        cancelDisable: true
      })
      //todo上传数据
    user.updateNoteAPI(item.id,this.data.text)
      let that=this
       var app = getApp()
       user.requestNotesAPI(app.globalData.openId).then((res) => {
        that.setData({
        noteList: res
      })
      var item = this.data.noteList[this.data.index];
    console.log(item)
    this.setData({
      title: item.title,
      text: item.noteContent,
      createDate: item.createDate,
    })
    }).catch((res) => {
      //todo
    })
    
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
  delete: function(e){
    var self=this
    wx.showModal({
      content: "确定要删除吗",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        if (res.confirm) {
          var Index = parseInt(e.currentTarget.dataset.index);
          var item = self.data.noteList[Index];
           user.deleteNoteAPI(item.id).then((res)=>{
              self.onShow()
           })
        }
      }
    })
   
  },
  showExample:function (e) {
    //todo
    //请求某篇note数据
    
    var Index = parseInt(e.currentTarget.dataset.index);
    var item = this.data.noteList[Index];
    if(item.createDate!=''){
    this.setData({
      showExample:true,
      index:Index,
      title: item.title,
      text: item.noteContent,
      createDate: item.createDate,
    })
  }
}
})