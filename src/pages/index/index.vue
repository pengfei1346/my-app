<template>
  <div class="container">

    <div id="loading" v-if="indicate">
      <img src="/static/imgs/newLoading.svg">
    </div>

    <div class="swiper-wrap">
      <swiper class="swiper"
              :indicator-dots="indicatorDots"
              :circular="true"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration"
              indicator-active-color="#ffffff">
        <block v-for="(item,index) in swiperArr" :key="index">
          <swiper-item>
            <a :href="'/pages/abstract/main?id='+ item.book._id">
              <img :src="item.img" >
            </a>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="title">| 前端开发</div>

    <div class="book" v-for="(item,index) in frontBookList.books" :key="index">
      <a :href="'/pages/abstract/main?id='+ item._id">
        <div class="book-img">
          <img :src="item.img">
        </div>
        <div class="book-introduce">
          <div class="book-box">
            <div class="book-title">{{item.title}}</div>
            <div class="book-content">{{item.desc}}</div>
          </div>

          <div class="book-time">
            <div class="left">{{item.author}}</div>
            <div class="right">两天前 前端开发 {{item.looknums}}人在看</div>
          </div>
        </div>
      </a>
    </div>

    <div class="title">| 后端开发</div>

    <div class="book" v-for="(item,index) in afterBookList.books" :key="index">
      <a :href="'/pages/abstract/main?id='+ item._id">
        <div class="book-img">
          <img :src="item.img">
        </div>
        <div class="book-introduce">
          <div class="book-box">
            <div class="book-title">{{item.title}}</div>
            <div class="book-content">{{item.desc}}</div>
          </div>

          <div class="book-time">
            <div class="left">{{item.author}}</div>
            <div class="right">两天前 前端开发 {{item.looknums}}人在看</div>
          </div>
        </div>
      </a>
    </div>

    <div v-show="!showPull">上拉加载更多</div>

    <div v-show="showPull">正在加载更多</div>

  </div>
</template>

<script>
  import { fetch } from "@/utils/index.js";

  export default {
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        swiperArr: [],
        frontBookList: [],
        afterBookList: [],
        indicate:true,
        showPull:false
      };
    },
    methods: {
      getSwiper() {
        fetch.get("/swiper").then(data => {
          // console.log(data.data)
          this.swiperArr = data.data;
        });
      },
      getBookInfo() {
        fetch.get("/category/books").then(res => {
          this.frontBookList = res.data[0];
          this.afterBookList = res.data[1];
          this.indicate = false
        });
      },
    },
    created() {
      this.getSwiper();
      this.getBookInfo();
    },
    onUnload(){
      this.swiperArr = "";
      this.frontBookList = "";
      this.afterBookList = "";
    },
    onPullDownRefresh() {
      wx.setBackgroundTextStyle({
        textStyle: 'dark',
      });
      this.getBookInfo();
      if(this.frontBookList && this.afterBookList){
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '加载成功',
        })
      } else {
        wx.showToast({
          title: '加载失败',
        })
      }
    },
    onReachBottom () {
      // console.log(123);
      this.showPull = true;

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

  .container {
    padding: 0 16rpx;
    .swiper-wrap{
      width: 100%;
      .swiper{
        height: 340rpx;
        width: 100%;
        img{
          height: 340rpx;
          width: 100%;
        }
      }
    }
    .title {
      margin: 14px 0;
      font-size: 14px;
      font-weight: 700;
      font-family: Fantasy;
      color: #000;
      letter-spacing: 4rpx;
    }
    .book {
      height: 260rpx;
      margin-bottom: 10px;

      a{
        display: flex;

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
          /*height: 110rpx;*/
          margin-left: 24rpx;
          color: #555;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 2rpx;
          .book-box{
            .book-title {
              color: #000;
              width: 205px;
              font-size: 12px;
            }
            .book-content {
              margin: 10px 0;
              height: 80rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .book-time {
            display: flex;
            justify-content: space-between;
            .right {
              /*width: 170px;*/
              margin-right: 4rpx;
            }
          }
        }
      }

    }
  }
</style>

