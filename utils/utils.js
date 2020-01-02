function converToStarsArray(stars){
  var num = stars.toString().substring(0, 1);
  var array = [];
  for(var i = 1; i<=5; i++){
    if(i<=num){
      array.push(1)
    }else{
      array.push(0)
    }
  }
  return array;
}
// 异步方法用callBack返回数据
function http(url, callBack){
  wx.request({
    url: url,
    header:{
      "Content-Type":"json"
    },
    method: 'GET',
    success: (res) => {
      callBack(res.data)
    },
    fail: (res) => {
      console.log(res, '请求豆瓣数据失败！')
    },
  })
}
module.exports= {
  converToStarsArray:converToStarsArray,
  http:http
}