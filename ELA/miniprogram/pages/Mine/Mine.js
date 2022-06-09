// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['四级大纲', '六级大纲', '考研大纲' ],
    index: 0,
    date: '2016-09-01',
    ddl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //缓存登录信息
    let user = wx.getStorageSync('user')
    console.log("进入小程序的index页面获取缓存",user)
    this.setData({
      userInfo: user
    })
  },

   //授权登录
   login(){
    // console.log("外部this",this);
    wx.getUserProfile({
      desc: '必须授权才可正常使用',
      success: res =>{
        console.log("授权成功",res.userInfo)
        // console.log("内部this",this);
        let user = res.userInfo
        //把用户信息缓存到本地
        wx.setStorageSync('user', user)
        this.setData({
          userInfo: user
        })
      },
      fail: res =>{
        console.log("授权失败",res);
      }
    })
  },
  //退出登录
  logout(){
    this.setData({
      userInfo: ""
    })
    wx.setStorageSync('user', null)
  },

  //picker
  bindPickerChange: function(e){
    // console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  //date
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    //计算时间差
    var t1=new Date(e.detail.value.replace(/-/g,"/"));//转换
    var data=new Date();//获取当前时间
    var times=t1.getTime()-data.getTime();//时间差的毫秒数
    var days=Math.ceil(times/(24*1000*3600));//计算相差的天数
    this.setData({
      date: e.detail.value,
      ddl: days
    })
  },

  //收藏列表
  star: function(e){
    wx.navigateTo({
      url: '../star/star',
    })
  },

  //查询记录
  history: function(e){
    wx.navigateTo({
      url: '../history/history',
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