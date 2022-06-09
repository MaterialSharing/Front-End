// pages/learnWords/learnWords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "",
    nickname: "",
    comment: "", //评论
    nowclientX: "", //左右滑动
    dict: "",
    id: 0,
    sum: null,
    dictList: [],
    wordList: []
  },

  //添加批注
  addComment: function(e){
    this.setData({
      comment: ""
    })
    wx.navigateTo({
      url: '../comment/comment',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户头像和昵称
    this.setData({
      avatar: wx.getStorageSync('user').avatarUrl,
      nickname: wx.getStorageSync('user').nickName
    })
    let that = this
    //get cet4单词总数
    wx.request({
      url: 'http://123.56.72.67:8000/word/sum/cet4',
      data: {examtype: "cet4"},
      method: "GET",
      success(res){
        console.log("get cet4 sum success",res.data.sum)
        that.setData({
          sum: res.data.sum
        })
        console.log("sum",that.data.sum)
      },
      fail(res){
        console.log("get cet4 sum fail",res)
      }
    })
    //get cet4单词
    wx.request({
      url: 'http://123.56.72.67:8000/word/cet4',
      data: {examtype: "cet4"},
      method: "GET",
      success(res){
        let wordList = res.data.results
        console.log("get cet4 words success", wordList)
        //get单词详细数据
        for(var i=0; i<wordList.length; i++){
          wx.request({
            url: 'http://123.56.72.67:8000/word/dict',
            data: {spelling: wordList[i].spelling},
            method: "GET",
            success(res2){
              let dict = res2.data.results[0]
              console.log("wordDetail success", dict)
              that.data.dictList.push(dict)
              // that.data.dictList = dict.concat(that.data.dictList) //单词逆序
              that.setData({
                dictList: that.data.dictList
              })
              // //单词列表pop出第一个单词
              // if(that.data.dictList.length==5){
              //   var temp = that.data.dictList.pop()
              //   console.log("temp",temp)
              //   that.setData({
              //     dictList: that.data.dictList,
              //     dict: temp
              //   })
              // }
            },
            fail(res2){
              console.log("wordDetail success", res2)
            }
          })
        }
      },
      fail(res){
        console.log("fail",res)
      }
    })
    // this.setData({
    //   dict: that.data.dictList.pop()
    // })
    // console.log("dictList",that.data.dictList)
    // console.log("dict",that.data.dict)
  },

  //滑动事件
  touchstart(e) {
		console.log(e)
		this.setData({
			nowclientX: e.changedTouches[0].clientX
		})
	},
	touchend(e) {
		let nowclientX = this.data.nowclientX;
		let clientX = e.changedTouches[0].clientX;
		if (clientX > nowclientX) {
      console.log("向右滑动")
      if(this.data.id-1 >= 0){
        this.setData({
          id: this.data.id-1
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: '已经到第一个单词了',
        })
      }
		} else {
      console.log("向左滑动")
      this.setData({
        id: this.data.id+1
      })
		}
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
    if(this.data.comment!=""){
      console.log("comment", this.data.comment)

    }
    // console.log("comment", this.data.comment)
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