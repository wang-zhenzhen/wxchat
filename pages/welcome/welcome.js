Page({
  onTap:function(){
    console.log('errrrrrrr')
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })
    wx.switchTab({
      url: '../posts/posts',
    })
    // 跳转后无返回按钮
    // wx.redirectTo({
    //   url: '../posts/posts',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})