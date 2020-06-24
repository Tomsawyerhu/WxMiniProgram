// components/bookcard/bookcard.js
import index from "../../api/index"
import Notify from '../../vant/notify/notify'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    p:String,
    d:String,
    a:String,
    n:String,
    bookId:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    'picurl':String,
    'description':String,
    'author':String,
    'name':String,
    'bookId':Number,
  },

  created:function(){
    var app=getApp()
    this.setData({
      'picurl':this.properties.p,
      'description':this.properties.d,
      'author':this.properties.a,
      'name':this.properties.n,
      'bookId':this.properties.bookId,
    })
  },

  attached:function(){
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addmethod:function (event) {
      console.log("add")
      var app=getApp()
      index.addToShelfAPI(this.data.bookId,app.globalData.openId).then((res)=>{
        if(res.success){
        Notify({ type: 'success', message: '收藏成功' ,context:this});
        }
        else{
          Notify({type:'danger',message:'已收藏过此书',context:this});
        }
      })
    },
    detailmethod:function(event) {
      var app = getApp()
      app.globalData.activeBookId=this.data.bookId
      app.globalData.activeBookName=this.data.n,
      app.globalData.activeBookImgUrl=this.data.p,
      app.globalData.activeBookAuthor=this.data.a,
      app.globalData.activeBookDescription=this.data.d,
      wx.navigateTo({
        url: '../../../pages/book/detail/detail',
      })
    }

  }
})
