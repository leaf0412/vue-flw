<template>
  <div class="videowrap">
    <headTop :headTitle="titleName"></headTop>
    <div class="box">
      <video :src="type" controls="controls" class="video"></video>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../commen/head.vue'
  import {videoitem} from '../../service/getData'

  export default {
    data() {
      return {
        titleName: '视频',
        type: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        let query = this.$route.query
        if (query.type) {
          this.type = query.type
        } else if (query.video) {
          let response = await videoitem(query.video)
          this.type = response.data.singleVideoInfo[0].video
        }
      }
    },
    components: {
      headTop
    }
  }
</script>

<style scoped lang="scss">
  @import '../../common/style/mixin';

  .videowrap {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 2;
    background-color: #000;
    overflow: auto;
    .box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .video {
      @include wh(100%, 525px)
    }
  }
</style>
