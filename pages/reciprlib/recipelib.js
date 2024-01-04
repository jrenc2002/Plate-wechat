// pages/reciprlib/recipelib.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipelib:[],
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
      recipelib:app.globalData.recipelib,
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
  turnkind(e){
    var that=this
    that.setData({
      kind:Math.floor(e.currentTarget.dataset.index)
    })
  },
  chancerecipe(e){
    var that=this;
    console.log(that.data.recipelib[that.data.kind][Math.floor(e.currentTarget.dataset.index)])
    console.log(Math.floor(e.currentTarget.dataset.index))
    app.globalData.chancefood=that.data.recipelib[that.data.kind][Math.floor(e.currentTarget.dataset.index)]["kind"];
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });

  }
})