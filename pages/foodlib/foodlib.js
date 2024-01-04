
// pages/foodlib/foodlib.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlib:[],
    chancefood:[[],[],[],[]],
    kind:0

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
    var that=this;
    that.setData({
      foodlib:app.globalData.foodlib,
      chancefood:app.globalData.chancefood
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
  addplate(e){
    var that=this

    var flag=0;
    var chancefood=that.data.chancefood
    for(var i=0;i<4;i++){
      if (chancefood[i]==undefined){
        console.log(app.globalData.foodlib[0][Math.floor(e.currentTarget.dataset.index)-1])
        chancefood[i]=app.globalData.foodlib[that.data.kind][Math.floor(e.currentTarget.dataset.index)-1]
        flag=1;
        break;
      }
    }
    console.log(flag)
    that.setData({
      chancefood:app.globalData.chancefood
    })
    app.globalData.chancefood=chancefood
    
    if(flag==0){
      wx.showToast({
        title: '餐盘已满',
        icon: 'error'
      });
    }
    if(flag==1){
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      });
    }

  },
  turnkind(e){
    var that=this
    
    that.setData({
      kind:Math.floor(e.currentTarget.dataset.index)
    })
  }

})