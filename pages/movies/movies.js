var app = getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
  },
  onLoad:function(event){
    // 正在热映
    var inTheatersUrl =app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    // 即将上映
    var comingSoonUrl =app.globalData.doubanBase+"/v2/movie/coming_soon"+"?start=0&count=3";
    // top250
    var top250Url =app.globalData.doubanBase+"/v2/movie/top250"+"?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters");
    this.getMovieListData(comingSoonUrl, "comingSoon");
    this.getMovieListData(top250Url, "top250");
  },
  // 请求接口
  getMovieListData:function(url, settedKey){
    wx.request({
      url: url,
      header:{
        "Content-Type":"json"
      },
      method: 'GET',
      success: (res) => {
        this.processDoubanData(res.data, settedKey)
      },
      fail: (res) => {
        console.log(res, '失败')
      },
    })
  },
  processDoubanData:function(movieDouban, settedKey){
    var movies = [];
    for(var idx in movieDouban.subjects){
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0, 6)+"..."
      }
      var temp = {
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    this.setData({
      movies:movies
    })
    console.log(movieDouban, 'llllllll')
  }
})