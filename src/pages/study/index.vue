<template>
  <div class="all-box">
    <div id="noLogin" v-if="showLogin">
      <img src="/static/imgs/catalog.png" alt="登录">
      <div id="login">登录后查看更多</div>
      <div id="now">立即登录</div>
    </div>

    <div id="isLogin" v-else="!showLogin">
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
        bookArr:[]
      }
    },
    methods:{
      getBooks () {
        fetch.get('/readList').then(res => {
          // console.log(res);
          this.bookArr = res.data.map(item => {
            item.percent = Math.floor( (item.title.index+1) / item.title.total * 100)
            return item
          })
        });
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
        this.showLogin = false
      }
    },
    onPullDownRefresh () {
      wx.setBackgroundTextStyle({
        textStyle: 'dark',
      });
      this.getBooks();
      wx.stopPullDownRefresh();
      if(this.bookArr){
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '加载成功',
        })
      } else {
        wx.showToast({
          title: '加载失败',
        })
      }
    }
  };
</script>

<style scoped lang="less">
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
