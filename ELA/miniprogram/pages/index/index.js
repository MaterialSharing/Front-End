//0 引入 用来发送请求的方法
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.发送异步请求获取轮播图数据
    // wx-wx.request({
    //   url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&n=2&mkt=en-us',
    //   success: (result) => {
    //     console.log(result)
    //     this.setData({
    //       swiperList:result.data.images
    //     })
    //   }
    // })
    
    this.getSwiperList();

  },

  //获取轮播图数据
  getSwiperList(){
    request({url:"https://cn.bing.com/HPImageArchive.aspx?format=js&n=2&mkt=en-us"})
      .then(result=>{
        this.setData({
        swiperList:result.data.images
        })
      })
  },

  selectBook: function(event){
    wx.navigateTo({
      url: '../learnWords/learnWords',
      success: (result) => {console.log("success")},
      fail: (res) => {console.log("failed")}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})