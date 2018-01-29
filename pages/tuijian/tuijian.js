// 引进获取数据的函数
const util = require("../../utils/util.js");
var CurrentPage = 0;
var selcerid = 0;
// pages/tuijian/tuijian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftTapArray: [],
    rightTapArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var parameters = "a=category&c=subscribe";
    wx.getSystemInfo({
      success: function (res) {
        var winHeight = res.windowHeight;
        that.setData({
            "winHeight" : winHeight
        })
      }
    })
    util.request(parameters, function (res) {
      // console.log(res)
      var temArray = res.data.list;
      //默认选中第一个 
      temArray[0].active=true;
      temArray[0].index = 0;

      for(let i=1;i<temArray.length;i++){
        temArray[i].active = false;
        temArray[i].index = i;
      }

      that.setData({
          leftTapArray:temArray
      })
     that.getRightData(that, temArray[0].id)
    })
  },
  leftTap:function(e){
    let oId =Number(e.target.dataset.index);
    // console.log(oId);
    let temArray = this.data.leftTapArray;
    // console.log(temArray);
    temArray[selcerid].active = false;
    selcerid = oId;
    temArray[selcerid].active = true;
    this.setData({
      leftTapArray: temArray
    })

    var id = e.currentTarget.dataset.leftid
    CurrentPage = 0;
    this.getRightData(this,id)
    this.setData({
      id: id
    })
  },

  //获取右边的数据
  getRightData:function(target, category_id){
    var parameters = "a=list&c=subscribe&category_id=" + category_id+"&page="+CurrentPage;
    util.request(parameters,function(res){
        target.setData({
          rightTapArray:res.data.list
        })
    })
  },
  //下拉加载更多 
  addMoreData:function(e){
    // console.log("到底部了");
    var that = this;
    var parameters = "a=list&c=subscribe&category_id=" + this.data.id + "&page=" + (CurrentPage+1);
    util.request(parameters,function(res){
      CurrentPage +=1;
      that.loginRightData(res,that)
    })
  },
  loginRightData:function(res,target){
    target.setData({
      rightTapArray: target.data.rightTapArray.concat(res.data.list)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})