const audioPlayer={
  audioContext:wx.createInnerAudioContext(),
  audioInfo:{
    length:Number,
    src:String,
    mode:String,
    status:"none",//音频播放状态
    __author__:"hhc",
    __version__:"1.0.0"
  }
}

const getDefaultPlayer=function () {
  audioPlayer.audioContext=wx.createInnerAudioContext()
  Object.keys(audioPlayer.audioInfo).forEach(v => {
    if(!v.startsWith("__")){
        audioPlayer.audioInfo[v]=null
      }
  });
  return audioPlayer;
}

const setBasicInfo=function (s) {
  Object.keys(s).forEach(v=>{
    audioPlayer.audioInfo[v]=s[v]
    if(v=="src"){
        audioPlayer.audioContext.src=s[v]
    }
    if(v=="loop"){
      audioPlayer.audioContext.loop=s[v]
    }
  })
}

const playAudio=function () {
  if(audioPlayer.audioContext.src){
    audioPlayer.audioContext.play()
    audioPlayer.audioInfo.status="on"
  }else{
    console.error("音频未初始化");
  }
  console.log(audioPlayer)
}

const pauseAudio=function(){
  if(audioPlayer.audioContext.src){
    audioPlayer.audioContext.pause()
    audioPlayer.audioInfo.status="pause"
  }else{
    console.error("音频未初始化");
  }
}

const replayAudio=function () {
  if(audioPlayer.audioContext.src){
    audioPlayer.audioContext.seek(0)
    if(audioPlayer.audioInfo.status!="on"){
      audioPlayer.audioContext.play()
      audioPlayer.audioContext.status="on"
    }
  }else{
    console.error("音频未初始化");
  }
}

const jumpTo=function (point) {
  if(audioPlayer.audioContext.src){
    audioPlayer.audioContext.seek(point>=audioPlayer.audioContext.length?0:point)
  }else{
    console.error("音频未初始化");
  }
}

const finish=function () {
  getDefaultPlayer()
  audioPlayer.audioInfo.status="none"
}

const getBasicInfo=function () {
  return audioPlayer.audioInfo
}

module.exports={
  setBasicInfo:setBasicInfo,
  playAudio:playAudio,
  pauseAudio:pauseAudio,
  replayAudio:replayAudio,
  jumpTo:jumpTo,
  finish:finish,
  getBasicInfo:getBasicInfo
}