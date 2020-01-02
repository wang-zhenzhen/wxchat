var util = require("../../utils/utils.js")
var app = getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
  },
  onLoad:function(event){
    // 正在热映
    var inTheatersUrl = app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    // 即将上映
    var comingSoonUrl = app.globalData.doubanBase+"/v2/movie/coming_soon"+"?start=0&count=3";
    // top250
    var top250Url = app.globalData.doubanBase+"/v2/movie/top250"+"?start=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250","豆瓣Top250");
  },
  // 请求接口
  getMovieListData:function(url, settedKey,categoryTitle){
    wx.request({
      url: url,
      header:{
        "Content-Type":"json"
      },
      method: 'GET',
      success: (res) => {
        this.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: (res) => {
        console.log(res, '请求豆瓣数据失败！')
      },
    })
  },
  // 将数据分类
  processDoubanData:function(movieDouban, settedKey, categoryTitle){
    // 电影有效信息数组
    var movies = [];
    for(var idx in movieDouban.subjects){
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0, 6)+"..."
      }
      //  [1,1,1,0,0] [1,1,1,1,1]
      var temp = {
        stars:util.converToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    // readyData[settedKey]:settedKey是data中的对象属性
    readyData[settedKey]= {
      // movies是数组
      movies:movies,
      categoryTitle:categoryTitle
    };
    this.setData(readyData)
  },
  // 跳转更多
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    })
  },
})