<template>
  <div class="head-other" id="head">
    <div class="head-back"><i class="iconfont icon-back" @click="routerTo"></i></div>
    <div class="head-title">{{headTitle}}</div>
    <div class="head-back"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: ['headTitle'],
    methods: {
      routerTo () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/style/mixin";

  .head-other{
    background: #000;
    position: fixed;
    z-index: 0;
    left:0;
    top:0;
    @include wh(100%,82px);
    line-height: 82px;
    display: flex;
    .head-back{
      position: relative;
      @include wh(82px,82px);
      i{
        color: #fff;
        @include center;
        font-size: 32px;/*px*/
      }
    }
    .head-title{
      flex: 1;
      height: 82px;
      text-align: center;
      color: #fff;
      @include ellipsis(1);
      font-size: 32px;/*px*/
    }
  }
</style>
