<template>
  <div class="wrap" :class="this.$route.path.indexOf('topic')>0?'zindex1':''">
    <headTop :headTitle="titleName" class="zindex1"></headTop>
    <div class="box">
      <div class="article">
        <div class="title">{{datas.title}}</div>
        <div class="sourcetime">
          <span>{{datas.updateTime}}</span><span class="source">{{datas.source}}</span>
        </div>
        <div class="content htmlbox" v-html="datas.text">

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import headTop from '@/components/commen/head'
  import {getarticle} from '@/service/getData'
  import {getUrl} from '@/config/mUtils'

  export default {
    data() {
      return {
        titleName: '文章',
        datas: {},
        y: 0
      }
    },
    created() {
      this.init();
      this.y = document.body.scrollTop
      document.body.setAttribute("class", "hid");
    },
    destroyed() {
      document.body.removeAttribute("class", "hid");
      document.body.scrollTop = this.y
    },
    methods: {
      async init() {
        let response = await getarticle(getUrl(this.$route.query));
        this.datas = response.data.body;
      },
    },
    components: {headTop},

  }
</script>

<style scoped lang="scss">
  @import '../../common/style/mixin';

  .wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 0;
    background-color: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .box {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 82px;
      -webkit-overflow-scrolling: touch;
    }
    .title, .sourcetime {
      padding: 0 20px;
    }
    .title {
      font-size: 34px; /*px*/
      font-weight: bold;
    }
    .sourcetime {
      font-size: 24px; /*px*/
      color: #666;
      margin: 20px 0;
      .source {
        margin-left: 10px;
      }
    }
    .content {
      padding: 0 10px;
      margin: 0 5px;
      font-size: 30px; /*px*/
      color: #666;
      line-height: 1.6;
    }

  }

</style>
