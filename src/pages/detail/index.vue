<template>
  <div class="container">
    <!--<div id="loading" v-if="indicate">-->
      <!--<img src="../../../static/imgs/loading1.gif">-->
    <!--</div>-->

    <div class="title">{{catalogueDetail.title}}</div>

    <div :style="{fontSize: fontSize + 'px'}" class="all">
      <wemark :md="essay.content" link highlight
              type="wemark"></wemark>
    </div>

    <div class="catalogue" v-if="isShow" @click="isShow = false">

      <div class="left-box" @click.stop="isShow = true">
        <div class="article-title">目录</div>
        <div class="List" v-for="(item,index) in catalogueArr"
             :key="index"
             :index="item._id"
             @click="handleJump(item._id)"
             :style= "item._id ==catalogueId ? 'background:red':'' ">
          {{item.title}}
        </div>
      </div>

      <div class="right-box"></div>
    </div>

    <div class="foot">
      <div @click="advance" id="add">+</div>
      <div @click="handleFet">目录</div>
      <div @click="addSize">大</div>
      <div @click="reduceSize">小</div>
      <div @click="retreat" id="reduce">-</div>
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
        isShow: false,
        fontSize: 10,
        dataIndex:"",
        indicate:true,
        background: "#fff",
        title:""
      };
    },
    methods: {
      handleFet(){
        this.isShow = true;
      },
      getDetail() {
        fetch.get(`/article/${this.catalogueId}`).then(res => {
          this.catalogueDetail = res.data;
          this.essay = res.data.article;
          this.title = res.data.title
          // this.indicate = false
        });
        this.getCatalogue();
      },
      getCatalogue() {
        fetch.get(`/titles/${this.bookId}`).then(res => {
          this.catalogueArr = res.data;

          this.catalogueArr.forEach(val => {
            if(val._id ==this.catalogueId){
              this.dataIndex=val.index;
              // this.background = "#0ff"
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
      advance(){
        let nowIndex = this.dataIndex ++;
        // console.log(nowIndex);
        this.catalogueArr.forEach(val => {
          if(val.index ==nowIndex){
            // console.log(val._id);
            this.catalogueId = val._id;
            this.getDetail()
          }
        })
      },
      retreat () {
        let nowIndex = this.dataIndex --;
        this.catalogueArr.forEach(val => {
          if(val.index ==nowIndex){
            this.catalogueId = val._id
            this.getDetail()
          }
        })
      },
      handleJump(value){
        this.catalogueId = value;
        this.getDetail();
        this.isShow = false;
      },

    },
    onLoad(options) {
      this.catalogueId = options.id;
      this.bookId = options.bookId;
      this.getDetail();
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
    }
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
    padding: 0 16rpx;
  }

  .catalogue {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    .left-box {
      flex: 8;
      padding-left: 30rpx;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      overflow: scroll;
      width: 80%;
      background-color: #fff;
      animation: move 2s ease;
      @keyframes move {
        0% {
          transform: translateX(-80%);
        }
        100%{
          transform: translateX(0);
        }
      }
      .List {
        margin: 20rpx 0;
        font-size: 16px;
      }
    }
    .right-box{
      flex: 1;
      background-color: rgba(0, 0, 0, .4);
    }
  }

  .foot {
    font-size: 12px;
    height: 70rpx;
    line-height: 70rpx;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
    z-index: 998;
    #add{
      text-align: center;
      width: 80rpx;
    }
    #reduce{
      text-align: center;
      width: 80rpx;
    }
  }
</style>
