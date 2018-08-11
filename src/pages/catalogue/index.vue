<template>
  <div class="container">
    <div id="loading" v-if="indicate">
      <img src="../../../static/imgs/loading1.gif">
    </div>

    <div class="title" v-for="(item,index) in catalogueArr" :key="index">
      <a :href="'/pages/detail/main?id='+ item._id + '&bookId=' + bookId">
        第{{index}}章 : {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>
  import {fetch} from "../../utils";

  export default {
    data() {
      return {
        bookId: "",
        catalogueArr:"",
        indicate:true,
      };
    },
    methods: {
      getBook() {
        fetch.get(`/titles/${this.bookId}`).then(res => {
          // console.log(res.data);
          this.catalogueArr = res.data;
          this.indicate = false
        })
      }
    },
    onLoad(options) {
      this.bookId = options.id;
      this.getBook();
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
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
      width: 600rpx;
      height: 800rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .container{
    .title{
      font-size: 14px;
      color: #777;
      padding: 10rpx 16rpx;
      background: #eee;
      border-bottom: 1px solid #bbb;
    }
  }
</style>
