// components/directory/directory.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookname:{
      type:String,
      value:"bookName"
    },//书名
    author:{
      type:String,
      value:"author"
    },//作者
    charpternum:{
      type:Number,
      value:"0"
    }//章数
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump_to_certain_charpter:function(charpter){
      wx.navigateTo({
        url: '../../pages/book/read',
        data:{
          charpter:charpter
        }
      })

    }//跳转至指定书的指定章节
  }
})
