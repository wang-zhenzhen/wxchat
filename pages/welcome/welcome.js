Page({
  onTap:function(){
    console.log('errrrrrrr')
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })
    
    // 跳转后无返回按钮
    // wx.redirectTo({
    //   url: '../posts/posts',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  formSubmit: function (e) {
    var loginObj = e.detail.value
    var registerObj = wx.getStorageSync('adminObject')
    console.log('form发生了submit事件，携带数据为：', e.detail.value, registerObj)
    if(loginObj.admin === registerObj.admin&&loginObj.password===registerObj.password){
      wx.navigateTo({
        url: '../posts/posts'
      })
    }else{
      wx.showToast({
        title: '密码或者账号错误！',
        icon:'none'
      })
    }
  },
  formReset: function () {
    console.log('reset.....')
    wx.navigateTo({
      url: '../register/register'
    })
  }
})