// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // input: [{"spelling": "sea", "explains":"大海"}]
    input: [],
    inputValue: ""
  },
  search(event){
    let text = event.detail.value //单词
    let that = this
    console.log("input", text)
    wx.request({
      url: 'http://123.56.72.67:8000/word/dict',
      data: {spelling: text},
      method: "GET",
      success(res){
        let dict = res.data.results[0]; //跟单词有关的json数据
        if(dict!=null){
          console.log("success", dict)
          that.data.input = [{"spelling": text, "explains": dict.explains.substring(2,20)}].concat(that.data.input)
          console.log("input", that.data.input)
          that.setData({
            input: that.data.input
          })
          wx.navigateTo({
            url: '/pages/wordDetail/wordDetail?dict='+JSON.stringify(dict),
          })
        }else{
          wx.showToast({
            icon: "none",
            title: '未找到相关内容',
          })
        }
        
       
      },
      fail(res){
        console.log("fail",res)
      }
    })
  },

  searchHistory(event){
    let text = event.currentTarget.dataset.word.spelling //单词
    console.log("搜索历史单词", text)
    wx.request({
      url: 'http://123.56.72.67:8000/word/dict',
      data: {spelling: text},
      method: "GET",
      success(res){
        let dict = res.data.results[0]; //跟单词有关的json数据
        console.log("历史搜索success", dict)
        wx.navigateTo({
          url: '/pages/wordDetail/wordDetail?dict='+JSON.stringify(dict),
        })
      },
      fail(res){
        console.log("fail",res)
      }
    })
  },

  //清空搜索历史
  deleteHistory(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要清空历史记录吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            input: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //清空输入框
  deleteInput(){
    console.log("清除input")
    this.setData({
      inputValue: ""
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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