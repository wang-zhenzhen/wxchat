
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starsObject:{
      stars:[1,1,1,1,0],
      score:'9.5'
    },
    imgageArr:[
      '../../../images/picture/imglist1.jpg',
      '../../../images/picture/imglist2.jpg',
      '../../../images/picture/imglist3.jpg',
      '../../../images/picture/imglist4.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = options.movieId
    var baseUrl = app.globalData.doubanBase
    var requestUrl = baseUrl+"/v2/movie/subject?id="+params
    wx.request({
      url: requestUrl,
      header:{
        "Content-Type":"json"
      },
      method: 'GET',
      success: (res) => {
        console.log(res, '详情查询成功！！！！！')
      },
      fail: (err) => {
        console.log(err)
      },
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