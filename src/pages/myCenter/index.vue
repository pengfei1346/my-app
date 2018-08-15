<template>
  <div class="all-box">
    <div id="loading" v-show="!indicate">
      <img src="/static/imgs/newLoading.svg">
    </div>

    <div v-if="indicate">
      <div class="top-box">
        <a href="/pages/login/main">
          <div class="left">
            <img src="/static/imgs/yun.jpg" id="img1" v-if="wetherShow">
            <img :src="userInfo.avatarUrl" id="img2" v-else="!wetherShow">
          </div>

          <div class="right">
            <div id="top-text" v-if="wetherShow">未登录</div>
            <div id="top-text" v-else="!wetherShow">{{userInfo.nickName}}</div>
            <div v-if="wetherShow">立即登录，开启您的云档之路</div>
            <div v-else="!wetherShow">这家伙很懒，什么也没留下</div>
          </div>
        </a>

        <div class="fans" v-if="!wetherShow">
          <div>
            <div>3</div>
            <div>收藏</div>
          </div>
          <div>
            <div>0</div>
            <div>关注</div>
          </div>
          <div>
            <div>1</div>
            <div>粉丝</div>
          </div>

        </div>
      </div>

      <div class="foot-box">
        <div>
          <img src="/static/imgs/yun.jpg">
        </div>
        <div>云书 2.0</div>
        <!--<a href="">-->
          <!--<img src="/static/imgs/admin.png">-->
          <!--<div>扫一扫</div>-->
        <!--</a>-->
        <!--<a href="">-->
          <!--<img src="/static/imgs/admin.png">-->
          <!--<div>文档中心</div>-->
        <!--</a>-->
        <!--<a href="">-->
          <!--<img src="/static/imgs/admin.png">-->
          <!--<div>钱包</div>-->
        <!--</a>-->
        <!--<a href="">-->
          <!--<img src="/static/imgs/admin.png">-->
          <!--<div>我的订单</div>-->
        <!--</a>-->
        <!--<a href="">-->
          <!--<img src="/static/imgs/admin.png">-->
          <!--<div>反馈建议</div>-->
        <!--</a>-->
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        wetherShow: true,
        indicate:true,
        userInfo:{}
      };
    },
    methods: {
      getUser(){
        this.userInfo = wx.getStorageSync('user');
        if(this.userInfo){
          this.wetherShow = false
        } else {
          this.wetherShow = true
        }
      }
    },
    onLoad(){
      this.getUser()
    },
    onShow(){
      this.getUser()
    }
  };
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
      width: 200rpx;
      height: 200rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  *{
    padding: 0;
    margin: 0;
  }
  .all-box{
    .top-box {
      padding: 30rpx 0 0 0;
      height: 160rpx;
      background: #1984d2;
      a{
        display: flex;
        justify-content: left;
        color: #fff;
        font-size: 14px;
        font-weight: 200;
        .left{
          margin: 10rpx 30rpx 10rpx 40rpx;
          #img1{
            width: 120rpx;
            height: 120rpx;
          }
          #img2{
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
          }
        }
        .right{
          margin-top: 40rpx;
          #top-text{
            margin-bottom: 10rpx;
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
      .fans{
        text-align: center;
        background: #1984d2;
        height: 90rpx;
        font-size: 14px;
        color: #fff;
        display: flex;
        justify-content: space-around;
      }
    }
    .foot-box{
      text-align: center;
      font-size: 18px;
      color: #999;
      img{
        margin-top: 200rpx;
        width: 400rpx;
        height: 400rpx;
      }
    }
  }
</style>
