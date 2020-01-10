// pages/operate/operate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderValue:20,
    buttonLoading:false,
    checkboxArray:[
      {id:0,name:'运动',value:'yudong'},
      {id:1,name:'娱乐', value:'yule'},
      {id:2,name:'看书', value:'read'},
      {id:3,name:'编程', value:'biancheng'},
    ],
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  buttonTap(){
    this.setData({
      buttonLoading:true
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  buttonCancelTap(){
    this.setData({
      buttonLoading:false
    })
  },
  checkboxChange(a){
    console.log(a, 'a.....')
  },
  onBindChange(event){
    console.log(event, 'event.......')
  },
  releaseWordTap(){
    wx.navigateTo({
      url: '/pages/editor/editor',
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