<template>
    <div class="big-box">
      <img src="/static/imgs/yun.jpg">

      <button open-type="getUserInfo" @click="getLogin" v-if="isShow">立即登录</button>

      <div class="count" v-else="!isShow">为了您的账户安全，请先绑定手机</div>

      <div class="foot">小程序由云档提供技术支持</div>
    </div>
</template>

<script>
  import {fetch} from "../../utils";

  export default {
    name: "index",
    data(){
      return {
        isShow:true,
        userData:""
      }
    },
    methods:{
      getLogin(){
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  // console.log(321);
                }
              })
            } else {

              wx.login({
                success: function(res) {
                  fetch.post('/login',{code:res.code}).then(vl => {
                    // console.log(vl);
                    if(vl.code == 200){
                      wx.showToast({ title: '登录成功', });
                      wx.navigateBack({ delta:1 })
                      wx.getUserInfo({
                        success: function(res) {
                          // this.userData = res.userInfo;
                          wx.setStorageSync('user',res.userInfo)
                        }
                      })
                    } else {
                      wx.showToast({
                        title: '登录失败',
                      })
                    }
                  })
                }
              });
            }
          }
        })
      },

    },
    onLoad() {},
  };
</script>

<style scoped lang="less">
  .big-box{
    text-align: center;
    button{
      width: 88%;
      color: white;
      font-size: 18px;
      background: #1894d2;
      border-radius: 30px;
    }
    img{
      margin: 150rpx 0 100rpx 0;
      height: 300rpx;
      width: 300rpx;
    }
    .count{
      font-size: 12px;
      color: #999;
      margin-top: 30rpx;
    }
    .foot{
      font-size: 12px;
      color: #999;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 20rpx;
      margin:0 auto;
      width:300px
    }
  }
</style>
