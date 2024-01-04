// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    postfood:[undefined,undefined,undefined,undefined],
    postnum:[0,0,0,0],
    postkll:[0,0,0,0],
    lastkkl:2600,
    len:"100%",
    lastflag:0,
    getkkl:0
  },

  onLoad() {
    
  },
  onShow() {
    
    var that=this
        // app.globalData.postnum=postnum
        // app.globalData.postnum=[20,32,43,23]
    that.setData({
      postfood:app.globalData.postfood,
      postnum:app.globalData.postnum,
      lastflag:app.globalData.lastflag
    })
    var lastkkl=that.data.lastkkl
    var getkkl=that.data.getkkl
    for(var i=0;i<4;i++){
      if(app.globalData.postfood[i]!==undefined){
        app.globalData.postkll[i]= Math.floor(app.globalData.postnum[i]*app.globalData.postfood[i].kll/100)
        if(that.data.lastflag==0){
          getkkl+=Math.floor(app.globalData.postkll[i])
          lastkkl-=Math.floor(app.globalData.postkll[i])
}
      }
    }
    that.setData({
      lastkkl,
      getkkl
    })
    that.setData({
      postkll:app.globalData.postkll,
      len:(that.data.lastkkl/2600).toFixed(2)*100+"%",
      lastflag:1,
    })
    
  },

})
