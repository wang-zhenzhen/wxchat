Page({
  onTap:function(){
    wx.navigateTo({
      url: '../posts/posts'
    })
    // 跳转后无返回按钮
    // wx:wx.redirectTo({
    //   url: '../posts/posts',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})