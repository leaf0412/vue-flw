<template>
  <section class="newslist">
    <div class="project" v-for="(item,index) in newslist">
      <div class="newsitem" v-if="item.type=='doc'" @click="toArticle(item.id)">
        <img v-if="item.thumbnail" :src="item.thumbnail" alt="" class="img">
        <div v-else class="none">暂无图片</div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="time">{{item.updateTime}}</span>
          <span class="commentnum">{{item.commentsall}}</span>
        </div>
      </div>

      <div class="videoitem" v-else-if="item.type=='phvideo'" @click="toVideo(item.id)">
        <div class="title">{{item.title}}</div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="time">{{item.updateTime}}</span>
          <span class="commentnum">{{item.commentsall}}</span>
        </div>
      </div>

      <div class="newslide" v-else-if="item.type=='slide'" @click="toCarousel(item.id)">
        <div class="title">{{item.title}}</div>
        <div class="imgbox">
          <img v-for="img in item.style.images" class="img" :src="img" alt="">
        </div>
        <span class="commentnum">{{item.commentsall}}</span>
      </div>

      <div class="newsitem" v-if="item.type=='topic2'" @click='toTopic(item.id)'>
        <img v-if="item.thumbnail" :src="item.thumbnail" class="img" />
        <div v-else class="none">暂无图片</div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="subtopic">专题</span>
          <span class="commentnum">{{item.commentsall}}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {dealurl} from '../../config/mUtils'
  export default {
    data() {
      return {}
    },
    props: {
      newslist: {
        type: Array,
        default: () => []
      }
    },
    created() {
    },
    methods: {
      toArticle(url) {
        this.$emit('toArticle', dealurl(url))
      },
      toCarousel(url) {
        this.$emit('toCarousel', dealurl(url))
      },
      toVideo(url) {
        this.$emit('toVideo', dealurl(url))
      },
      toTopic(url) {
        this.$emit('toTopic', dealurl(url))
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/style/mixin";

  .newsitem {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 0.4rem;
    position: relative;
    .img {
      @include wh(198px, 141px);
      margin-right: 15px;
    }
    .none {
      @include wh(198px, 141px);
      margin-right: 15px;
      text-align: center;
      line-height: 140px;
      font-size: 30px; /*px*/
      border: 1px solid #eee;
      box-sizing: border-box;
    }
    .cont {
      flex: 1;
      position: relative;
      font-size: 28px; /*px*/
    }
    .commentnum {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 24px; /*px*/
    }
    .time {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 24px; /*px*/
    }
    .subtopic{
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 24px;/*px*/
      color: #fff;
      padding: 6px 10px;
      background: red;
    }
  }
  .newslide{
    position: relative;
    border-bottom: 1px solid #eee;
    padding: 0 30px 40px;
    font-size: 32px;/*px*/
    .title{
      text-align: center;
      line-height: 50px;
    }
    .imgbox{
      display: flex;
      justify-content: space-around;
      .img{
        padding: 10px;
        height: 200px;
        width: 33.3%;
      }
    }
    .commentnum{
      position: absolute;
      bottom: 0;
      right: 30px;
      font-size:24px; /*px*/;
    }
  }
  .videoitem{
    padding: 30px;
    position: relative;
    .title{
      font-size:32px; /*px*/;
      margin-bottom: 30px;
    }
    .img{
      width: 100%;
      height: 380px;
    }
    .commentnum{
      position: absolute;
      bottom: 0;
      right: 30px;
      font-size:24px; /*px*/;
    }
  }
</style>
