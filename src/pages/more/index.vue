<template>
    <div class="big-box">

      <div id="loading" v-if="indicate">
        <img src="/static/imgs/newLoading.svg">
      </div>

      <div class="book" v-for="(list,index) in bookArr" :key="index">

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
              <div class="right">{{clTitle}}</div>
              <div class="right">{{list.looknums}}人在看</div>
            </div>
          </div>
        </a>

      </div>

      <div class="pull-box">
        <div v-show="!isAll">{{showPull?"上拉加载更多...":"正在加载更多..."}}</div>
        <div v-show="isAll">已经全部加载</div>
      </div>
    </div>
</template>

<script>
  import {fetch} from "../../utils";
  import getTime from '../../components/getTime'

  export default {
    name: "index",
    components:{
      getTime
    },
    data(){
      return {
        listId:'',
        bookArr:[],
        indicate:true,
        pn:1,
        isAll:false,
        showPull:true,
        clTitle:""
      }
    },
    methods:{
      getList(){
        let pn =this.pn;
        fetch.get(`/category/${this.listId}/books?pn=${pn}$size=6`).then(res =>{
          this.indicate = false;
          this.clTitle = res.data.title
          if(res.data.books.length == 0){
            this.showArr = false;
            this.whether = false;
            this.isAll = true;
          }else if(res.data.books.length < 5){
            this.whether = false;
            this.isAll = true;
            this.showArr = false;
            this.bookArr = this.bookArr.concat(res.data.books);
          }  else {
            this.showArr = false;
            this.showPull = true;
            this.bookArr = this.bookArr.concat(res.data.books);
          }

        })
      }
    },
    onLoad (options) {
      this.pn = 1;
      this.whether = true;
      this.listId = options.id;
      this.getList()
    },
    onUnload() {
      this.bookArr=[]
    },
    onReachBottom () {
      this.showPull = false;
      if(this.whether){
        this.pn = this.pn + 1;
        this.getList()
      }
    }
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
  .big-box{
    padding: 0 16rpx;
    text-align: center;
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
</style>
