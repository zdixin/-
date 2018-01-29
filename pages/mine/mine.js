
//引进获取数据的连接
let util =require('../../utils/util.js');
// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      iconlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    var parameters = "a=square&c=topic";
    util.request(parameters,function(res){
      var list = res.data.square_list;
        that.setData({
          iconlist:list
        })
    })
  }
})