<template>
  <div class="big-box">
    <div id="loading" v-if="indicate">
      <img src="/static/imgs/newLoading.svg">
    </div>

    <div class="all-box">
      <div class="book" v-for="(item,index) in bookArr" :key="index">
        <!--@click="handleJump(item.book._id)"-->
        <div class="collection-box"
             @touchstart="touchStart"
             @touchend="touchEnd"
             @click="judgeFuc(item.book._id)">
          <img :src="item.book.img">
          <!--<div class="delete" :longpress="longTap">删除收藏</div>-->
        </div>
        <div class="book-title">{{item.book.title}}</div>

        <div class="check"
             v-show="showDelete"
             @click="deleteCollection(item.book._id)">
          <icon type="cancel" size="14" color="#000"/>
        </div>
      </div>
    </div>

    <div class="content" v-show="showArr">没有内容...</div>

    <div class="pull-box" v-show="!showArr">
      <div v-show="!isAll">{{showPull?"上拉加载更多...":"正在加载更多..."}}</div>
      <div v-show="isAll">已经全部加载</div>
    </div>
  </div>

</template>

<script>
  import {fetch} from "../../utils";

  export default {
    name: "index",
    data() {
      return{
        bookArr:[],
        showPull:true,
        pn:1,
        whether:true,
        indicate:true,
        isAll:false,
        showArr:true,
        //删除
        showDelete:false,
        touchStartTime: 0,
        // 触摸结束时间
        touchEndTime: 0,
        // 最后一次单击事件点击发生时间
        lastTapTime: 0,
      }
    },
    methods:{
      judgeFuc(e) {
        // console.log(e);
        let startTime = this.touchStartTime;
        let endTime = this.touchEndTime;
        // console.log(endTime - startTime);
        if((endTime-startTime) <= 200){
          this.handleJump(e);
        } else if((endTime-startTime) >= 550) {
          this.showDelete = true;
          // this.deleteCollection(e);
        }
      },
      deleteCollection(val) {
        fetch.del(`/collection/${val}`).then(res =>{

          if(res.code == 200){
            this.showDelete = false;
            fetch.get(`/collection?pn=1&size=10`).then(res =>{
              this.bookArr = res.data
            })
          } else {
            wx.showToast({ title: '删除失败', });
          }
        })
      },
      touchStart(e) {
        this.touchStartTime = e.timeStamp
      },
      touchEnd(e) {
        this.touchEndTime = e.timeStamp
      },
      getCollection() {
        let pn = this.pn;
        fetch.get(`/collection?pn=${pn}`).then(res => {
          this.indicate = false;
          if(res.data.length == 0){
            if(this.pn=1){
              this.showArr = true;
              this.whether = true;
              this.isAll = true;
            } else {
              this.showArr = false;
              this.whether = false;
              this.isAll = true;
            }
          } else if(res.data.length <= 10){
            this.showArr = false;
            this.isAll = true;
            this.whether = false;
            this.bookArr = this.bookArr.concat(res.data);
          } else {
            this.showArr = false;
            this.showPull = true;
            this.bookArr = this.bookArr.concat(res.data);
            // console.log(this.bookArr);
          }
        })
      },
      handleJump(val) {
        wx.navigateTo({
          url: '/pages/abstract/main?id=' + val,
        })
      }
    },
    onShow () {
      this.showDelete = false;
      this.isAll = false
      this.showDelete = false;
      this.getCollection()
    },
    onReachBottom () {
      this.showPull = false;
      if(this.whether){
        this.pn = this.pn + 1;
        this.getCollection()
      }
    },
    onUnload() {
      this.bookArr = []
    }
  };
</script>

<style scoped lang="less">
  .content{
    letter-spacing: 0.1rem;
    padding-top: 50rpx;
    font-size: 18px;
    color: #888;
    text-align: center;
    margin: 0 auto;
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
  .all-box {
    display: flex;
    /*justify-content: space-between;*/
    flex-wrap: wrap;
    padding: 0 14rpx;
    .book{
      position: relative;
      text-align: center;
      margin: 14rpx 0rpx 18rpx 8rpx;
      width: 230rpx;
      font-size: 12px;
      color: #444;
      .check{
        width: 14rpx;
        height: 14rpx;
        position: absolute;
        color: #f00;
        background: #fff;
        border-radius: 50%;
        font-size: 14px;
        z-index: 999;
        top: -10rpx;
        left: -10rpx;
      }
      .collection-box{
        img{
          width: 220rpx;
          height: 260rpx;
        }
      }
      .book-title{
        margin-top: 8rpx;
      }
    }
  }
  .pull-box{
    margin: 20rpx 0;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
</style>
