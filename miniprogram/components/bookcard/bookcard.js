// components/bookcard/bookcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    p:String,
    d:String,
    a:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    'picurl':String,
    'description':String,
    'author':String
  },

  created:function(){
    var app=getApp()
    this.setData({
      'picurl':this.properties.p,
      'description':this.properties.d,
      'author':this.properties.a,
    })
  },

  attached:function(){
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sharemethod:function (event) {
      console.log("share")
    },
    addmethod:function (event) {
      console.log("add")
    },
    detailmethod:function(event) {
      console.log("detail")
    }

  }
})
