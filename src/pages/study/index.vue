<template>
  <div class="all-box">
    <div id="noLogin" v-if="showLogin">
      <img src="/static/imgs/catalog.png" alt="登录">
      <div id="login">登录后查看更多</div>
      <div id="now" @click="handleLogin">立即登录</div>
    </div>

    <div id="isLogin" v-else="!showLogin">
      <div id="loading" v-if="indicate">
        <img src="/static/imgs/newLoading.svg">
      </div>

      <div class="book" v-for="(item,index) in bookArr" :key="index">

        <div class="book-img">
          <img :src="item.book.img">
        </div>
        <div class="book-introduce">
          <div class="book-box">
            <div class="book-title">{{item.book.title}}</div>
            <div class="book-content">前端 {{item.title.index + 1}}/{{item.title.total}} 章节</div>
          </div>

          <div class="loading">
            <progress class="progress"
                      :percent=item.percent
                      activeColor="#1084d2"></progress>
            <div class="jin">已看{{item.percent}}%</div>
          </div>

          <div class="look">
            <div id="kan">上次查看:{{item.title.title}}</div>
            <div id="time"> <getTime :time="item.updatedTime"></getTime></div>
          </div>

          <div class="continue">
            <div class="left" @click="handleContinue(item.title._id,item.title.bookId)">继续阅读</div>
            <div class="left" @click="handleSee(item.title.bookId)">查看文档</div>
          </div>

        </div>

      </div>

      <div class="content" v-show="showArr">没有内容...</div>

      <div class="pull-box" v-if="!showArr">
        <div v-show="!isAll">{{showPull?"上拉加载更多...":"正在加载更多..."}}</div>
        <div v-show="isAll">已经全部加载</div>
      </div>

    </div>
  </div>
</template>

<script>
  import {fetch} from "../../utils";
  import getTime from '../../components/getTime'

  export default {
    components:{
      getTime
    },
    data(){
      return{
        showLogin:true,
        bookArr:[],
        showArr:true,
        indicate:true,
        pn:1,
        whether:true,
        showPull:true,
        isAll:false,
      }
    },
    methods:{
      getBooks () {
        this.userInfo = wx.getStorageSync('user');
        if(this.userInfo) {
          this.showLogin = false;
        }
        let pn = this.pn;
        fetch.get(`/readList?pn=${pn}&size=5`).then(res => {
          this.indicate = false;
          if(res.data.length == 0){
            if (this.pn=1) {
              this.showArr = true;
              this.whether = true;
              this.isAll = true;
            } else {
              this.showArr = false;

              this.whether = false;
              this.isAll = true;
            }
          } else if(res.data.length < 5){
            this.whether = false;
            this.isAll = true;
            this.showArr = false;
            this.bookArr = this.bookArr.concat(res.data);

            this.bookArr = this.bookArr.map(item => {
              item.percent = Math.floor( (item.title.index+1) / item.title.total * 100)
              return item
            });
          } else {
            this.showPull = true;
            this.bookArr = this.bookArr.concat(res.data);
            this.showArr = false;
            this.bookArr = this.bookArr.map(item => {
              item.percent = Math.floor( (item.title.index+1) / item.title.total * 100)
              return item
            });
          }

        });
      },
      handleLogin() {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      },
      handleContinue (val1,val2) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + val1 + '&bookId='+ val2,
        })
      },
      handleSee (val) {
        wx.navigateTo({
          url: '/pages/abstract/main?id=' + val,
        })
      }
    },
    onLoad () {
      this.getBooks();
      this.userInfo = wx.getStorageSync('user');
      if(this.userInfo) {
        this.showLogin = false;
      }
    },
    onUnload() {
      this.bookArr = []
    },
    onPullDownRefresh () {
      wx.setBackgroundTextStyle({
        textStyle: 'dark',
      });
      this.whether = true;
      this.isAll = false;
      this.pn = 1;
      this.bookArr = [];
      this.getBooks();
      this.indicate = true;
      wx.stopPullDownRefresh();
    },
    onReachBottom () {
      this.showPull = false;
      if(this.whether ){
        this.pn = this.pn + 1;
        this.getBooks();
        // console.log(this.pn);
      }
    },
  };
</script>

<style scoped lang="less">
  .pull-box{
    height: 40rpx;
    margin: 20rpx 0;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
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
  * {
    padding: 0;
    margin: 0;
  }
  .all-box {
    font-size: 14px;
    color: #666;
    text-align: center;
    #noLogin {
      img{
        margin-top: 300rpx;
        width: 80rpx;
        height: 80rpx;
      }
      #login{
        margin-top: 30rpx;
      }
      #now{
        margin-top: 30rpx;
      }
    }

    #isLogin {
      text-align: left;
      padding: 0 16rpx;
      .content{
        letter-spacing: 0.1rem;
        padding-top: 50rpx;
        font-size: 18px;
        color: #888;
        text-align: center;
        margin: 0 auto;
      }
      .book {
        height: 260rpx;
        margin-bottom: 30rpx;

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
          width: 480rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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

          }
          .loading{
            display: flex;
            progress{
              width: 70%;
              margin-right: 6rpx;
            }
            .jin{
              color: #1084d2;
              margin-left: 6rpx ;
            }
          }
          .look {
            width: 480rpx;
            font-size: 10px;
            display: flex;
            justify-content: space-between;
            #kan {
              margin: 0;
              padding: 0;
            }
            #time {
              margin: 0;
              padding: 0;
            }
          }
          .continue {
            display: flex;
            justify-content: space-between;
            .left{
              padding: 10rpx 14rpx;
              background: #eee;
            }
          }
        }
      }
    }
  }
</style>
