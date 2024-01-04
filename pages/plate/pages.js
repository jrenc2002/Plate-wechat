// pages/canpan1/pages.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexflag:0,
    chancefood:[undefined,undefined,undefined,undefined],
    recommendget:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that=this
    console.log("傻s23宝")
    that.setData({
      chancefood:app.globalData.chancefood
    })

    // 自动判断盘数
    if(app.globalData.chancefood[3] && app.globalData.chancefood[3].length!=0){
      that.setData({indexflag:1})}//4个
    else{
      that.setData({indexflag:0})}//3个


    const foodEnergies = [0.1, 0.2, 0.3, 0.4];
    const sameresult = [0,0,0,0];//有几个相同的值
    const avekll = [0,0,0,0];//有几个相同的值
    const sumkll = [0,0,0,0];//每种的卡路里综合
    var index=0;
    var sum=1;
    var contno=0
    //总能量800，然后每个菜的每百克卡路里知道，只要设本顿水果摄入x克，4x·平均主食热量+3x·平均蔬菜热量+2x·平均肉热量+x·平均水果热量=800，如果有相同种类的食物就取其相同种类的食物所占热量的平均值去计算克数，然后将计算的克数按热量比例去平分。kll是每100g的热量 
    // 已知条件:总能量，菜品每百克卡路里；求解：其按4：3：2：1大小的主食克数;
    // （4x·平均主食热量+3x·平均蔬菜热量+2x·平均肉热量+x·平均水果热量）/10=800
    // 1.统计所有的主食是否有重复的，同时删除没有的权重2.算出每个平均热量 3.用平均热量去求解存在相应权重的800热量值对应的g，4.将g分为多分进行复制；

    //todo 1.统计所有的主食是否有重复的
    // 遍历食物获取是否有相同种类的食物，相同种类的存入result[]
    
    that.data.chancefood.forEach(food => {
      if(food !== undefined && food.kind !== undefined&&food !== null && food.kind !== null){
        
        sameresult[food.kind-1]++;
        sumkll[food.kind-1]=food.kll+sumkll[food.kind-1];
        console.log(sumkll)
        console.log(sameresult)
      }
    });
    // 删除总计里没有的种类的数
    for(var i=0;i<4;i++){
      // 每种的平均卡路里
      if(sameresult[i]!=0)avekll[i]=sumkll[i]/sameresult[i]
      if(sameresult[i]==0){
        sum-=foodEnergies[i]
        foodEnergies[i]=0;
        contno++;
      }
      
    }
    //  2.算出每个平均热量
     // （4x·平均主食热量+3x·平均蔬菜热量+2x·平均肉热量+x·平均水果热量）/10=800
    console.log(avekll)
    // G=总克数
     var g=800/((foodEnergies[3]*avekll[3]+foodEnergies[2]*avekll[2]+foodEnergies[1]*avekll[1]+foodEnergies[0]*avekll[0])/sum)*100


 
    that.data.chancefood.forEach(food => {
      if(food !== undefined && food.kind !== undefined&&food !== null && food.kind !== null){
        console.log(g,sameresult[food.kind-1],food.kind,foodEnergies[food.kind-1],(foodEnergies[food.kind-1]/sum),sum)
        
        app.globalData.recommendget[index]=Math.floor(g/sameresult[food.kind-1]*(foodEnergies[food.kind-1]/sum))


        index++;
      }
    });
    that.setData({
      recommendget:app.globalData.recommendget
    })


    
   
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  left(){
    var that=this
    if(that.data.indexflag==1){
      that.setData({
        indexflag:0
      })     


    }
  },
  right(){
    var that=this
    if(that.data.indexflag==0){
      that.setData({
        indexflag:1
      })     


    }

  },
  cancelchance(e){
    var that =this
    console.log(e.currentTarget.dataset.index)
    app.globalData.chancefood[e.currentTarget.dataset.index-1]=undefined
    that.setData({
      chancefood:app.globalData.chancefood
    })
  },
  updata(){
    var that=this
    app.globalData.postfood=app.globalData.chancefood
    app.globalData.lastflag=0
    app.globalData.chancefood=[undefined,undefined,undefined,undefined]
    that.setData({
      chancefood:[undefined,undefined,undefined,undefined]
    })


    var qttcon=0
    for(var i=0;that.data.recommendget[i]!=-1&&i<4;i++){
      qttcon++
    }
    var qtt="{"+qttcon+"}"
    
    for(var i=0;app.globalData.postfood[i]!==undefined;i++){
      if(app.globalData.postfood[i].kind==4){
        var id=app.globalData.postfood[i].id
        qtt=qtt+"{"+id+"}"

      }
      else if(app.globalData.postfood[i].kind==2){
        var id=12+app.globalData.postfood[i].id
        qtt=qtt+"{"+id+"}"

      }
      else if(app.globalData.postfood[i].kind==3){
        var id=22+app.globalData.postfood[i].id
        qtt=qtt+"{"+id+"}"
      }
      else if(app.globalData.postfood[i].kind==1){
        var id=36+app.globalData.postfood[i].id
        qtt=qtt+"{"+id+"}"

      }
    }
    for(var i=0;that.data.recommendget[i]!=-1&&i<4;i++){
      qtt=qtt+"{"+that.data.recommendget[i]+"}"
      
    }
    console.log(qtt)
    app.globalData.client.publish('topic/app', qtt, { qos: 2, retain: true }, function (err) {
      console.log('send', err)
      console.log(qtt)
    })
    wx.showToast({
      title: '已发送数据',
      icon: 'success'
    });
      app.globalData.recommendget= [-1,-1,-1,-1]
      that.setData({
        recommendget: [-1,-1,-1,-1]

      })


  }


})

