<template>
  <div>
    <div id="box">
      <div id="item_list">
        <div>111</div>
        <div>222</div>
        <div>333</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  #box {
    width: 300px;
    background: #000;
    animation: move 4s linear;
  }
  @keyframes move {
    0% {
      transform: translateX(300px);
    }
    50%{
      transform: translateX(-300px);
    }
    60%{
      transform: translateX(-300px);
    }
  }

</style>
