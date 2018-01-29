const config = require("config.js");

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



//网络请求
function request(parameters = "",success,method = "GET",header = {}){
  wx.request({
    url: config.BaseURL + (method == "GET" ? "?" : "")+parameters,
    data:{},
    method:method,
    header:header?header:"application/json",
    success:function(res){
      success(res);
    }
  })
}


module.exports = {
  formatTime: formatTime,
  request:request
}
