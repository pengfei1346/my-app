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

    <div class="classify-box" v-for="(item,value) in classifyArr" :key="value">
      <div class="title">
        <div>| {{item.title}}</div>
        <div id="more" @click="handleMore(item._id)">更多 > </div>
      </div>

      <div class="book" v-for="(list,index) in item.books" :key="index">

          <a :href="'/pages/abstract/main?id='+ list._id">
            <div class="book-img">
              <img :src="list.img">
            </div>
            <div class="book-introduce">
              <div class="book-box">
                <div class="book-title">{{list.title}}</div>
                <div class="book-content">{{list.desc}}</div>
              </div>

              <div class="book-time">
                <div class="right">{{list.author}}</div>
                <div class="right">
                  <getTime :time="list.updateTime"></getTime>
                </div>
                <div class="right">{{item.title}}</div>
                <div class="right">{{list.looknums}}人在看</div>
              </div>
            </div>
          </a>

      </div>

    </div>

    <div class="pull-box" v-show="!showArr">
      <div v-show="!isAll">{{showPull?"上拉加载更多...":"正在加载更多..."}}</div>
      <div v-show="isAll">已经全部加载</div>
    </div>

  </div>
</template>

<script>
  import { fetch } from "@/utils/index.js";
  import getTime from '../../components/getTime'

  export default {
    components:{
      getTime
    },
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        swiperArr: [],
        indicate:true,
        classifyArr: [],
        pn:1,
        size:2,
        showPull:true,
        isAll:false,
        whether:true,
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
        let pn = this.pn;
        fetch.get(`/category/books?pn=${pn}&size=2&booksSize=3`).then(res => {
          // console.log(res.data);
          this.indicate = false;
          if(res.data.length == 0){
              this.showArr = false;
              this.whether = false;
              this.isAll = true;

          } else if(res.data.length < 2){
            this.showArr = false;
            this.isAll = true;
            this.whether = false;
            this.classifyArr = this.classifyArr.concat(res.data);
          } else {
            this.showArr = false;
            this.showPull = true;
            this.classifyArr = this.classifyArr.concat(res.data);
            // console.log(this.bookArr);
          }
        });

      },
      handleMore(val) {
        wx.navigateTo({
          url: '/pages/more/main?id=' + val,
        })
      }
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
      // console.log(this.whether);
      this.showPull = false;
      if(this.whether){
        this.pn = this.pn + 1;
        this.getBookInfo()
      }
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
    .classify-box{
      .title {
        display: flex;
        justify-content: space-between;
        margin: 14px 0;
        font-size: 14px;
        font-weight: 700;
        font-family: Fantasy;
        color: #000;
        letter-spacing: 4rpx;
        #more{
          font-weight: 100;
          color: #222;
          font-size: 10px;
        }
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
                margin-right: 4rpx;
              }
            }
          }
        }

      }
    }
    .pull-box{
      margin-top: 20rpx;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  }
</style>

