// 公共方法
var util = require('../../../utils/utils.js')
// 获取全局数据
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    navigateTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    this.setData({
      navigateTitle: category,
    })
    var dataUrl = "";
    // 根据不同分类获取豆瓣不同电影数据
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl:dataUrl
    })
    // 调公共的请求豆瓣的方法
    util.http(dataUrl, this.processDoubanData)
  },
  // 下拉加载更多
  onScrollLower:function(event){
    console.log('scrolll......')
    var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20"
    util.http(nextUrl, this.processDoubanData)
  },
  // 回调
  processDoubanData: function (movieDouban) {
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      //  [1,1,1,0,0] [1,1,1,1,1]
      var temp = {
        stars: util.converToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
      var totalMovies = {}
      if(!this.data.isEmpty){
        totalMovies = this.data.movies.concat(movies);
      }else{
        totalMovies = movies;
        this.setData({
          isEmpty:false
        })
      }
    }
    this.setData({
      movies:totalMovies
    })
    this.data.totalCount+=20
  },
  onReady: function (event) {
    var navigateTitle = this.data.navigateTitle
    wx.setNavigationBarTitle({
      title: navigateTitle,
    })
  },
})