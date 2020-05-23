//设置监听器
const setWatcher=function(page){
  let data = page.data;
  let watch = page.watch;
  //console.log(watch)
  let count=1
  Object.keys(watch).forEach(v=>{
    if(count<=Object.keys(watch).length){
      //console.log(v)
      //console.log(watch[v])
      //console.log(v.substr(0,v.length-7))
      observe(data,v.substr(0,v.length-7),watch[v].handler||watch[v],page)
      count+=1
    }
    
  })
}
const observe=function(obj, key,watchFun,page) {
  var val = obj[key]; // 原值
  //console.log(val)
  Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
          val = value;
          watchFun.call(page,value,val); // 调用setter时，调用对应函数
          //console.log(val)
      },
      get: function() {
          return val;
      }
  })
}


module.exports={
  setWatcher:setWatcher
}
