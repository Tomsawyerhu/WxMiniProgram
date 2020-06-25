// miniprogram/pages/book/search/search.js
import index from '../../../api/index' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
        index1:[0,1,2,3],
        index2:[0,1],
        books:[],
        haveresult:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //todo 加载热词数据
    //todo 加载最近搜索关键词
  
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
      this.setData({
        index1:[],
        index2:[],
        books:[]
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

  onCancel: function () {
    wx.navigateBack()
  },

  splitHotWords: function () {
    //热词数组下标
    let p = 0
    //热刺分组数组下标
    let q = -1

    var cal_length = (m) => {
      let l = 0
      let x
      for (x in hotWordsSplit[m]) {
        l += x[1]
      }
      return l
    }

    let hotWordsSplit = []

    while (p < this.data.hotWords.length) {
      if (String(this.data.hotWords[p]).length > this.data.spanLimit * this.data.spanCharLimit) {
        p += 1
      } else {
        if (q == -1) {
          hotWordsSplit[0] = new Array()
          q += 1
        }
        let leng = cal_length(q)
        if (24 - leng < Math.ceil(this.data.hotWords[p] / this.data.spanCharLimit) * (24 / this.data.spanCharLimit)) {
          hotWordsSplit.push([])
          q += 1
        } else {
          hotWordsSplit[q].push([this.data.hotWords[p], Math.ceil(this.data.hotWords[p].length / this.data.spanCharLimit) * parseInt(24 / this.data.spanCharLimit)])
          p += 1
        }
      }
    }
    this.setData({
      hotWordsSplit: hotWordsSplit
    })
  },

  onSearch:function(e){
    var v=e.detail
    this.search(v)
  },

  search:function(v){
    //todo 搜索
    console.log(v)
    var that=this
    if(v!=''){
      index.getBookListAPI(v).then((res) => {
        that.setData({
          books: res,
          
        })
      
        that.setData({
          booksnum:this.data.books.length
        })
        if(this.data.booksNum!=0){
          that.setData({
            haveresult:false,
          })
        }
        else{
          that.setData({
            haveresult:true
          })
        }
        that.setData({
          //+1保证底边格式
          'index1': [...Array(Math.ceil(this.data.booksnum / 2 )).keys()],
          'index2': [...Array(2).keys()]
        })
        
      }).catch((res) => {
        //todo
      })
    }
    
  },

  tapKeyWord:function(e){
    let index=e.currentTarget.dataset.index
    this.setData({
      searchValue:this.data.latelyUsedWords[index]
    })
    var ex=require("../user/readingRecord/readingRecord.js")
    let pro=ex.sleep(1000)
    pro.then(this.search(this.data.searchValue))
  },

  tapHotWord:function (e) {
    this.setData({
      searchValue:e.currentTarget.dataset.value
    })
    var ex=require("../user/readingRecord/readingRecord.js")
    let pro=ex.sleep(1000)
    pro.then(this.search(this.data.searchValue))
  }


})