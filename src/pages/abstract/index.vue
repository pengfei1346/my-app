<template>
  <div class="container">
    <div id="loading" v-if="indicate">
      <img src="../../../static/imgs/loading1.gif">
    </div>

    <div class="book">
      <div class="book-img">
        <img :src="severBook.img">
      </div>

      <div class="book-introduce">
        <div class="book-title">{{severBook.title}}</div>
        <div>作者:{{severBook.author}}</div>
        <div>{{severBook.looknums}}人在看</div>
        <div>{{severBook.startsnums}}人喜欢</div>
      </div>
    </div>

    <div class="share-box">
      <button class='collect'>加入收藏</button>
      <button class='collect' open-type="share">分享好友</button>
      <button class='collect'>分享朋友圈</button>
      <!--<div class="collect">加入收藏</div>-->
      <!--<div class="collect">分享好友</div>-->
      <!--<div class="collect">分享朋友圈</div>-->
    </div>

    <div class="letter">
      <div id="letter-title">简介</div>
      <div id="letter-content">{{severBook.desc}}</div>
    </div>

    <div class="look">
      <div>
        <span id="left">查看目录</span>
        <span id="middle">共{{catalogue}}章</span>
      </div>
      <div id="right">更新于2天前 ></div>
    </div>

    <div class="foot">
      <a :href="'/pages/catalogue/main?id='+ bookId">
        <div id="read">阅读该书籍</div>
      </a>
    </div>
  </div>
</template>

<script>
  import { fetch } from "@/utils/index.js";

  export default {
    data () {
      return {
        indicate:true,
        bookId:"",
        severBook:"",
        catalogue:"",
        tempFilePaths: '',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    methods:{
      getBookInfo() {
        fetch.get(`/book/${this.bookId}`).then(res => {
          this.severBook = res.data;
          this.catalogue = res.length;
          this.indicate = false
        });
      },
    },
    onLoad (options) {
      this.bookId = options.id
      this.getBookInfo()
    },
    onShareAppMessage: function (ops) {
      if (ops.from === 'button') {
        console.log(ops.target)
      }
      return {
        title: this.severBook.title,
        path: '/pages/bookdesc/main',
        imageUrl: this.severBook.img,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
  }
</script>

<style scoped lang="less">
  #loading{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: #fff;
    img{
      width: 600rpx;
      height: 800rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .container {

    .book {
      padding: 0 16rpx;
      display: flex;
      height: 260rpx;
      margin-bottom: 10px;
      .book-img {
        width: 220rpx;
        height: 260rpx;
        img {
          width: 220rpx;
          height: 260rpx;
        }
      }

      .book-introduce {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 260rpx;
        margin-left: 44rpx;
        color: #555;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 2rpx;
        .book-title{
          color: #000;
          font-size: 15px;
        }
      }
    }
    .share-box {
      padding: 18px 10px 16px 10px;
      display: flex;
      justify-content: space-around;
      border-bottom: 4px solid #eee;
      .collect{
        font-size: 14px;
        background: #eee;
        border-radius: 4px;
        padding: 8px 26px;
      }
    }

    .letter {
      padding: 10rpx 16rpx 16rpx 16rpx;
      border-bottom: 2px solid #eee;
      #letter-title{
        font-size: 15px;
        color: #000;
        font-weight: 700;
        margin: 8rpx 0 20rpx 0;
      }
      #letter-content{
        font-size: 12px;
        color: #bbb;
        font-weight: normal;
      }
    }
    .look {
      line-height: 44rpx;
      padding: 28rpx 16rpx;
      display: flex;
      color: #bbb;
      justify-content: space-between;
      border-bottom: 4px solid #eee;
      #left{
        color: #000;
        font-weight: 700;
        margin-right: 12rpx;
        font-size: 15px;
      }
      #middle{
        font-size: 12px;
      }
      #right{
        font-size: 10px;
      }
    }

    .foot {
      position: fixed;
      bottom: 20rpx;
      left: 4rpx;
      right: 4rpx;
      text-align: center;
      #read{
        padding: 10rpx 0;
        border-radius: 4px;
        width: 720rpx;
        font-size: 14px;
        color: #fff;
        margin: 0 auto;
        background: skyblue;
      }
    }
  }
</style>
