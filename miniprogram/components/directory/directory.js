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
    charpters:{
      type:Array,
      value:{}
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
    jump_to_certain_charpter:function(data){
      var charpter=data.currentTarget.dataset.index
      this.triggerEvent("changeCharpter", charpter+1);
    }//跳转至指定书的指定章节
  }
})
