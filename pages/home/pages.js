// pages/huanyingshiyong/pages.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chancedflag:-1,
    ordrecipe:[
     {
      "name": "蛋奶素食食谱",
      "kind": [{
        "id": 1,
        "kind": 2,
        "name": "鸡蛋",
        "kll": 140,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1226/egg.png"
      },{
        "id": 10,
        "kind": 2,
        "name": "牛奶",
        "kll": 66,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13f6/milk.png" 
      },{
        "id": 8,
        "kind": 4,
        "name": "玉米",
        "kll": 113,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc11d8/corn.png"
      },{
        "id": 6,
        "kind": 4,
        "name": "紫薯",
        "kll": 134,
        "foodpath": "https://pic2.imgdb.cn/item/6446826d0d2dde5777bc0dfe/sweet_potato.png"
      }],
      "kll": 453,
      "recpath":"https://pic2.imgdb.cn/item/64468e500d2dde5777cd6070/f9c7c7ef8d084e09a5440bc0e1dc2d33.png",
    },
    {
      "name": "减脂食谱",
      "kind": [{
        "id": 12,
        "kind": 4, 
        "name": "三明治",
        "kll": 262,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc1305/ham_sandwich.png"
      },{
        "id": 10,
        "kind": 2, 
        "name": "牛奶",
        "kll": 66,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13f6/milk.png" 
      },{
        "id": 12,
        "kind": 1, 
        "name": "蓝莓",
        "kll": 58,
        "foodpath": "https://pic2.imgdb.cn/item/6446826e0d2dde5777bc100d/blueberry.png"
      }],
      "kll": 342,
      "recpath":"https://pic2.imgdb.cn/item/64468e500d2dde5777cd60ec/微信图片_20230421141354.png",
    },
    {
      "name": "纯素食食谱",
      "kind": [{
        "id": 14,
        "kind": 3,
        "name": "大白菜",
        "kll": 23,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc118e/chinese_cabbage.png"
      }, {
        "id": 8,
        "kind": 4,
        "name": "玉米",
        "kll": 113,
        "foodpath": "https://pic2.imgdb.cn/item/6446826f0d2dde5777bc11d8/corn.png"
      }, {
        "id": 11,
        "kind": 4,
        "name": "麦片",
        "kll": 369,
        "foodpath": "https://pic2.imgdb.cn/item/644682700d2dde5777bc13f6/milk.png" 
      }],
      "kll": 340,
      "recpath":"https://pic2.imgdb.cn/item/64468f8d0d2dde5777cf39db/微信图片_20230420160833.png",
    },
  ]
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
  // 跳转到进入食物库页面
  turnfoodchance(){
    wx.navigateTo({
      url: '../foodlib/foodlib',
    })

  },
   // 跳转到进入食谱库页面
   turnrecilibchance(){
    wx.navigateTo({
      url: '../reciprlib/recipelib',
    })

  },
   // 将食谱加入食物库界面
   chancerecipe(e){
    var that=this;
    app.globalData.chancefood=that.data.ordrecipe[Number(e.target.dataset.index)]["kind"];
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
   }
  
})