var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({id, id})
    var postData = postsData.postList[id];
    this.setData({ postData: postData})
    var postsCollected = wx.getStorageSync('posts-collected')
    if (postsCollected){
      var postsCollected = postsCollected[id]
      if (postsCollected){
          this.setData({
          collected: postsCollected
        })
      }
    }else{
      var postsCollected = {};
      // 第一次点进来默认为false
      postsCollected[id] = false;
      wx.setStorageSync('posts-collected', postsCollected);
    }
    // 全局音乐播放的状态
    if(app.globalData.g_isPlayingMusic&&app.globalData.g_currentMusicPostId===this.data.id){
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay((res) => {
      that.setData({
        isPlayingMusic : true
      })
      app.globalData.g_isPlayingMusic  = true;
      app.globalData.g_currentMusicPostId = that.data.id
    });
    wx.onBackgroundAudioPause((res) => {
      that.setData({
        isPlayingMusic  :false
      });
      app.globalData.g_isPlayingMusic  = false;
      app.globalData.g_currentMusicPostId = null
    });
    wx.onBackgroundAudioStop((res) => {
      that.setData({
        isPlayingMusic  :false
      });
      app.globalData.g_isPlayingMusic  = false;
      app.globalData.g_currentMusicPostId = null
    })
  },
  // 点击事件
  onCollectionTap:function(event){
    // 获取缓存 postsCollected是一个{}
    var postsCollected = wx.getStorageSync('posts-collected')
    // 被点击当前对象的选中状态
    var postCollected = postsCollected[this.data.id];
    // 点击按钮取反，收藏便成为收藏
    postCollected = !postCollected
    postsCollected[this.data.id] = postCollected
    // 更新文章是否收藏的缓存值
    wx.setStorageSync('posts-collected', postsCollected);
    // 更新数据绑定变量，从而实现切换 
    this.setData({
      collected: postCollected
    })
    // this.showModal(postCollected)
    this.showToast(postCollected)
  },
  // showToast提示
  showToast:function(res){
    // 提示
    wx.showToast({
      title: res?"收藏成功":"取消成功",
      duration:1000,
      icon:'success',
    })
  },
  // showModal提示
  showModal:function(res){
    wx.showModal({
      title: res ? "收藏" : "取消收藏",
      content: res ? "是否收藏该文章？" : "是否取消收藏？",
      showCancel:'true',
      confirmText:'确定',
      cancelText:'取消',
      cancelColor:'#333',
      confirmColor:'405f80'
    })
  },
  onShareTap(event){
    var list = [
      "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
    ]
    wx.showActionSheet({
      itemList:list,
      itemColor:"#405f80",
      success:function(res){
        console.log(res, 'res......')
        wx.showModal({
          title: list[res.tapIndex],
          content: "是否将该文章"+list[res.tapIndex]+"?",
          showCancel:'true',
          confirmText:'确定',
          cancelText:'取消',
          cancelColor:'#333',
          confirmColor:'405f80',
          // 分享成功
          success:function(res){
            if(res.confirm){
              wx.showToast({
                title: '分享成功',
              })
            }
          }
        })
        // res.cancel用户是否点击取消
        // res.tapIndex用户是否点击对象数组元素
      }
    })
  },
  // 音乐播放
  onMusicTap:function(event){
    var currentData = this.data.postData.music
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: currentData.url,
        title: currentData.title,
        coverImgUrl: currentData.coverImg
      })
      this.setData({
        isPlayingMusic:true
      })
    }
  },
  // 清除缓存
  deleteStoreSync:function(){
    // 清除指定缓存
    wx.removeStorageSync('key')
    // 清除所有缓存
    wx.clearStorageSync()
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