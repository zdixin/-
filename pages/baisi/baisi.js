//引入网络请求的文件utils
const util = require("../../utils/util.js");

//定义一些属性
var types = ["1","41","10","29","31"]
var page = 1;
var allMaxtime = 0; //全部  最大时间
var videoMaxtime = 0; //视频  最大时间 
var audioMaxtime = 0; // 音频  最大时间
var picMaxtime = 0; // 图片 最大时间
var textMaxtime = 0; // 段子 最大时间


//定义数据的变量，1->全部  41->视频，10->图片，29->段子，31->声音
var DATATYPE={
  ALLDATATYPR : "1",
  VIDEODATATYPE : "41",
  PICDATATYPE : "10",
  TEXTDATATYPE : "29",
  AUDIODARATYPE : "31"
};

// pages/baisi/baisi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //导航栏
      topTap: [
        {
          name:"全部",
          active:true
        },
        {
          name:"视频",
          active: false
        },
        {
          name:"图片",
          active: false
        },
        {
          name:"段子",
          active: false
        },
        {
          name:"声音",
          active: false
        }
       ],
      //数据的存放数组
      //1.全部
      allDatalist:[],
      //2.视频
      videoDatalist:[],
      //3.图片
      picDatalist:[],
      //4.音频
      audioDatalist:[],
      //5.段子
      textDatalist:[],
      //获取每个导航栏的值
      currentTopItem:"0",
      swiperHeight:"0"
  },

  //跳转到评论的页面
  pinglun: function () {
    wx.navigateTo({
      url: "../pinglun/pinglun",
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //调用获取数据的函数。
     this.getNewData();
  },
  getNewData:function(){
      var that = this;
      var parameters = 'a=list&c=data&type='+types[this.data.currentTopItem]+"&page="+page;
      util.request(parameters,function(res){
          that.setNewDataWithRes(res,that);
      })
  },onpullDownRefresh:function(){
    this.getNewData();
  }
  ,
  //点击切换按钮获取对应的值
   switchTap:function(e){
     let oName = e.target.dataset.name;
     //循环菜单
    //  console.log(oName);
     var tmp = this.data.topTap.map(function(arr,index){
      //  console.log(arr.name);
        if(arr.name==oName){
          arr.active=true;
        }else{
          arr.active=false;
        }
        return arr;
     })


      this.setData({
        currentTopItem:e.currentTarget.dataset.idx,
        topTap:tmp
      });
     
      if(this.needLoadNewDataAfterSwiper()){
          this.getNewData();
      }
  },
   bindchange: function (e) {
    this.setData({
      currentTopItem:e.detail.current
    });
    if (this.needLoadNewDataAfterSwiper()) {
      this.getNewData();
    }
  },
  //在对应的数组里面添加对应的数据
  setNewDataWithRes:function(res,target){
      switch(types[this.data.currentTopItem]){
        //设置全部数据
        case DATATYPE.ALLDATATYPR:
        allMaxtime:res.data.info.maxtime;
        target.setData({
          allDatalist:res.data.list
        })
        break;
        //设置视频数据
        case DATATYPE.VIDEODATATYPE:
        videoMaxtime:res.data.info.maxtime;
        target.setData({
          videoDatalist:res.data.list
        })
        break;
        //设置图片数据
        case DATATYPE.PICDATATYPE:
        picMaxtime:res.data.info.maxtime
        target.setData({
          picDatalist:res.data.list
        })
        break;
        //设置段子
        case DATATYPE.TEXTDATATYPE:
          textMaxtime: res.data.info.maxtime
        target.setData({
          textDatalist:res.data.list
        })
        break;
        //设置声音
        case DATATYPE.AUDIODARATYPE:
          audioMaxtime: res.data.info.maxtime
        target.setData({
          audioDatalist:res.data.list
        })
        break;
        default:
        break;
      }
   }, 
   needLoadNewDataAfterSwiper:function(){
     switch(types[this.data.currentTopItem]){
        case DATATYPE.ALLDATATYPR:
         return this.data.allDatalist.length > 0 ?false : true;
        break;
        
        case DATATYPE.AUDIODARATYPE:
         return this.data.audioDatalist.length > 0 ?false :true;
        break;

        case DATATYPE.PICDATATYPE:
         return this.data.picDatalist.length > 0 ? false : true;
        break;

        case DATATYPE.TEXTDATATYPE:
         return this.data.textDatalist.length > 0 ? false : true;
        break;

        case DATATYPE.VIDEODATATYPE:
         return this.data.videoDatalist.length >0 ? false : true;
        break;

        default:
        break;
     }
     return false;
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          swiperHeight:(res.windowHeight-27)
        })
      },
    })
  },
  loadMoreData:function(){
    console.log("dibu");
      var that = this;
      var parameters = 'a=list&c=data&type='+types[this.data.currentTopItem]+"&page="+(page+1);
      util.request(parameters,function(res){
          page+=1;
          console.log(page);
          console.log(res);
          that.setMoreDataWithRes(res,that);
          
      })
  },
  setMoreDataWithRes:function(res,target){
    //循环
    switch(types[this.data.currentTopItem]){
      case DATATYPE.ALLDATATYPR:
      allMaxtime:res.data.info.maxtime;
      target.setData({
        allDatalist:target.data.allDatalist.concat(res.data.list)
      });
      break;

      case DATATYPE.AUDIODARATYPE:
      audioMaxtime:res.data.info.maxtime;
      target.setData({
        audioDatalist:target.data.audioDatalist.concat(res.data.list)
      });
      break;

      case DATATYPE.TEXTDATATYPE:
      textMaxtime:res.data.info.maxtime;
      target.setData({
        textDatalist:target.data.textDatalist.concat(res.data.list)
      });
      break;

      case DATATYPE.PICDATATYPE:
      picMaxtime:res.data.info.maxtime;
      target.setData({
        picDatalist:target.data.picDatalist.concat(res.data.list)
      });
      break;

      case DATATYPE.VIDEODATATYPE:
      videoMaxtime:res.data.info.maxtime;
      target.setData({
        videoDatalist:target.data.videoDatalist.concat(res.data.list)
      });
      break;

      default:
      break;
    }
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