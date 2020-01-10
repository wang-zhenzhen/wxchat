// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin:'',
    password:'',
    confirmgPassword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var adminObj = e.detail.value
    if(adminObj.admin&&adminObj.confirmgPassword&&adminObj.password){
      wx.setStorageSync('adminObject', adminObj)
      this.setData({
        admin:'',
        password:'',
        confirmgPassword:''
      })
    }else{
      wx.showToast({
        title: '请将信息填写完整',
        icon:"none",
      })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
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