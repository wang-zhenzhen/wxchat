var app = getApp();
Page({
  onLoad:function(event){
    // 正在热映
    var inTheatersUrl =app.globalData.doubanBase+"/v2/movie/in_theaters";
    // 即将上映
    var comingSoonUrl =app.globalData.doubanBase+"/v2/movie/coming_soon";
    // top250
    var top250Url =app.globalData.doubanBase+"/v2/movie/top250";
    this.getMovieListData(top250Url);
  },
  // 请求接口
  getMovieListData:function(url){
    wx.request({
      url: url,
      header:{
        "Content-Type":"json"
      },
      method: 'GET',
      success: (result) => {
        console.log(result, '成功')
      },
      fail: (res) => {
        console.log(res, '失败')
      },
    })
  }
})