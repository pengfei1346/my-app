<template>
  <div class="container">
    <div id="loading" v-if="indicate">
      <img src="/static/imgs/newLoading.svg">
    </div>

    <div class="title">{{catalogueDetail.title}}</div>

    <div :style="{fontSize: fontSize + 'px'}" class="all">
      <wemark :md="essay.content" link highlight
              type="rich-text"></wemark>
    </div>

    <div class="mask" v-show="showMsk" @click="handleFet"></div>

    <scroll-view  :style="{transform: 'translateX('+ trans +')',width:  widths + 'rpx'}"
                  :scroll-y="true" class="catalogue">
      <!--<div class="article-title">目录</div>-->
      <div class="List" v-for="(item,index) in catalogueArr"
           :key="index"
           :index="item._id"
           @click="handleJump(item._id)"
           :style= "item._id ==catalogueId ? 'background:red':'' ">
        {{item.title}}
      </div>
    </scroll-view>


    <div class="footer">
      <div @click="retreat" id="add">
        <img src="/static/imgs/left.png">
      </div>
      <div @click="handleFet"><img src="/static/imgs/catalog.png"></div>
      <div @click="addSize"><img src="/static/imgs/font-increase.png"></div>
      <div @click="reduceSize"><img src="/static/imgs/font-decrease.png"></div>
      <div @click="advance" id="reduce"><img src="/static/imgs/right.png"></div>
    </div>
  </div>
</template>

<script>
  import { fetch } from "../../utils";

  export default {
    data() {
      return {
        animationData: {},
        catalogueId: "",
        catalogueDetail: "",
        essay: "",
        catalogueArr: [],
        fontSize: 12,
        dataIndex:"",
        indicate:true,
        background: "#fff",
        title:"",
        widths:0,
        showMsk: false,
        trans:"-600rpx"
      };
    },

    methods: {
      handleFet(){
        // console.log(this.widths);
        this.showMsk = !this.showMsk;
        if(this.showMsk){
          this.trans = 0;
          this.widths = "600";
        } else {
          this.trans = '-600rpx'
        }
      },
      getDetail() {
        fetch.get(`/article/${this.catalogueId}`).then(res => {
          // console.log(res.data);
          this.catalogueDetail = res.data;
          this.essay = res.data.article;
          this.title = res.data.title;
          this.indicate = false;
        });
        this.getCatalogue();
      },
      getCatalogue() {
        fetch.get(`/titles/${this.bookId}`).then(res => {
          this.catalogueArr = res.data;

          this.catalogueArr.forEach(val => {
            if(val._id ==this.catalogueId){
              this.dataIndex=val.index;
            }
          })

        })
      },
      addSize(){
        this.fontSize += 5
      },
      reduceSize(){
        this.fontSize -= 5
      },
      retreat () {
        let nowIndex = this.dataIndex - 1;

        if(nowIndex <= -1){
          wx.showToast({
            title: '没有上一章了'
          })
        } else {
          this.catalogueArr.forEach(val => {
            if(val.index ==nowIndex){
              this.catalogueId = val._id;
              this.getDetail()
            }
          })
        }
      },
      advance(){
        let nowIndex = this.dataIndex + 1;
        // console.log(nowIndex);
        if(nowIndex >= this.catalogueArr.length   ){
          wx.showToast({
            title: '没有更多章节了'
          })
        } else {
          this.catalogueArr.forEach(val => {
            if(val.index ==nowIndex){
              // console.log(val._id);
              this.catalogueId = val._id;
              this.getDetail()
            }
          })
        }

      },
      handleJump(value){
        this.widths = "0";
        this.indicate = true;
        this.handleFet();
        this.catalogueId = value;
        this.getDetail();
      },
    },
    onShow(){
      this.showMsk = false;
      this.widths = "0";
    },
    onLoad(options) {
      this.widths = "0";
      this.trans = "-600rpx";
      this.catalogueId = options.id;
      this.bookId = options.bookId;
      this.getDetail();

    },
    onUnload(){
      this.essay.content = ""
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
    watch:{
      title(){
        let title = this.title;
        wx.setNavigationBarTitle({
          title
        })
      }
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
  }

  .mask{
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.4);
  }
  .catalogue {
    transition: transform .5s ease;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0 ;
    z-index: 999;
    height: 100%;
    background-color: #fff;
    .article-title{
      margin: 20rpx 14rpx;
      color: #00f;
    }
    .List {
      margin: 20rpx 14rpx;
      font-size: 16px;
    }
  }

  .footer {
    font-size: 12px;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
    z-index: 998;
    img{
      margin-top: 15rpx;
      width: 70rpx;
      height: 70rpx;
    }
  }
</style>
