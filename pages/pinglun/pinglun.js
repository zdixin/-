var util = require("../../utils/util.js");

var data_id = 26999314;
var page = 1;
// pages/pinglun/pinglun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinglunlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var parameters = "a=dataList&c=comment&data_id="+data_id+"&hot=1";
    util.request(parameters,function(res){
      page=1;

      var datalist = res.data.data;
      that.setData({
        pinglunlist:datalist,
      })
    })
  }
})