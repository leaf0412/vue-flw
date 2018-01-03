<template>
  <section class="topiclist" :id="'list-'+ index">
    <span class="itemtitle" :id="'item-'+ index">{{topiclist.title}}</span>
    <div class="project" v-for="(item,index) in topiclist.podItems" >

      <div class="newsitem" v-if="item.links[0].type == 'doc'" @click='toArticle(item.id ? item.id : item.links[0].url)'>
        <img v-if="item.thumbnail" :src="item.thumbnail" class="img"/>
        <div v-else class="none">暂无图片</div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="time">{{item.updateTime}}</span>
          <span class="commentnum">{{item.commentCount}}</span>
        </div>
      </div>

      <div class="newslide" v-else-if="item.links[0].type == 'slide'" @click='toCarousel(item.id ? item.id : item.links[0].url)'>
        <div class="title">{{item.title}}</div>
        <div class="imgbox">
          <img v-for="img in item.thumbnails" class="img" :src="img"/>
        </div>
        <span class="commentnum">{{item.commentCount}}</span>
      </div>

      <div class="newsitem" v-if="item.links[0].type == 'video'" @click='toVideo(item.mp4 ? item.mp4 : item.links[0].url)'>
        <div class="video">
          <img v-if="item.thumbnail" :src="item.thumbnail" class="img video"/>
        </div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="time">{{item.updateTime}}</span>
          <span class="commentnum">{{item.commentCount}}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import {dealurl} from '@/config/mUtils'

  export default {
    data() {
      return {}
    },
    props: {
      topiclist: {
        type: Object,
        default: () => {
        }
      },
      index: {
        type: Number
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
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/style/mixin";

  /*.topic {
    padding: 0 20px;
    margin: 40px 0 10px;
    display: flex;
    justify-content: space-between;
    .category {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      @include wh(134px, 104px)
    }
    .title {
      line-height: 60px;
      font-size: 32px; !*px*!
    }
  }*/

  .newsitem {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 30px;
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
      @include font-dpr(15px);
      border: 1px solid #eee;
      box-sizing: border-box
    }
    .cont {
      flex: 1;
      position: relative;
      font-size: 28px; /*px*/
    ;
    }
    .commentnum {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 32px; /*px*/
    ;
    }
    .time {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 32px; /*px*/
    ;
    }
    .subtopic {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 32px; /*px*/
    ;
      color: #fff;
      padding: 150px 10px;
      background: red;
    }
  }

  .newslide {
    position: relative;
    border-bottom: 1px solid #eee;
    padding: 0 30px 40px;
    font-size: 16px; /*px*/
  ;
    .title {
      text-align: center;
      line-height: 50px;
    }
    .imgbox {
      display: flex;
      justify-content: space-around;
      .img {
        padding: 10px;
        height: 200px;
        width: 33.3%;
      }
    }
    .commentnum {
      position: absolute;
      bottom: 0;
      right: 30px;
      font-size: 12px; /*px*/
    ;
    }
  }

  .videoitem {
    padding: 30px;
    position: relative;
    .title {
      font-size: 16px; /*px*/
    ;
      margin-bottom: 30px
    }
    .img {
      width: 100%;
      height: 380px;
    }
    .commentnum {
      position: absolute;
      bottom: 0;
      right: 30px;
      font-size: 32px; /*px*/
    ;
    }
  }

  .itemtitle {
    display: block;
    margin: 0 20px;
    line-height: 90px;
    font-size: 36px;
    border-bottom: 1px solid #eee;
    color: #FF7256;
  }
</style>
