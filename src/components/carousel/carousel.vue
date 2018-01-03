<template>
  <div class="carousel" :class="this.$route.path.indexOf('topic')>0?'zindex1':''">
    <headTop :headTitle="titleName"></headTop>

    <div class="box">
      <swiper :options="swiperOption" class="carouselbox" v-if="slides.length>1">
        <swiper-slide class="carousel-item" v-for="(item,index) in slides" :key="index">
          <img :src="item.image" class="img"/>
        </swiper-slide>
      </swiper>
      <div class="content">
        <div class="title">
          <span class="currenttitle">{{title}}</span>
          <span class="currentnum">{{current}}/{{slides.length}}</span>
        </div>
        <div class="description"><span>{{description}}</span></div>
      </div>
      <div class="comment" @click="toComment">
        <span class="num">{{commentnum}}</span>
        <div class="border-dian">
          <div class="dian"></div>
        </div>
      </div>
      <transition name="router-slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../commen/head.vue'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getcarousel, hotcomment} from '../../service/getData'

  var myVue = this;

  export default {
    data() {
      return {
        titleName: '图片',
        slides: [],
        title: '',
        current: 1,
        description: '',
        commentnum: '',
        commentsUrl: '', // 作为参数传给子页面comment,vue
        page: 1,
        swiperOption: {
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          notNextTick: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            stopOnLastSlide: false
          },
          on: {
            slideChangeTransitionEnd: function () {
              myVue.changeSlide(this.activeIndex)
            }
          },
        }
      }
    },
    created() {
      this.init()
    },
    beforeCreate() {
      myVue = this
    },
    methods: {
      async init() {
        let type = null
        if (!this.$route.query.type) {
          let path = this.$route.fullPath
          let num = path.indexOf("?") + 1
          let keyStr = path.substr(num)
          type = this.GetQueryString(keyStr, this.commentsUrl)
        } else {
          type = this.$route.query.type
        }
        let response = await getcarousel(type)
        let data = response.data.body
        this.slides = data.slides
        this.title = data.title
        this.description = data.slides[0].description
        this.commentsUrl = data.commentsUrl;

        response = await hotcomment(this.page,this.commentsUrl)
        this.commentnum = response.data.join_count
      },
      GetQueryString(str, name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = str.match(reg);
        if (r != null) return decodeURI(r[2])
        else return null
      },
      changeSlide(index) {
        this.current = index + 1
        this.description = this.slides[index].description
      },
      toComment() {
        this.$router.push('/comment?title='+this.title+'&url='+this.commentsUrl)
      }
    },
    components: {
      swiper,
      swiperSlide,
      headTop
    }
  }
</script>

<style scoped lang="scss">
  @import '../../common/style/mixin';

  .carousel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: #000;
    overflow: auto;
    .box {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 82px;
      .comment {
        color: #fff;
        position: absolute;
        right: 0;
        top: 82px;
        display: flex;
        align-items: center;
        font-size: 30px; /*px*/
        z-index: 2;
        width: 100%;
        flex-direction: row-reverse;
        background: #000;
        .border-dian {
          border: 1px solid #fff;
          background: #000;
          border-radius: 10px 10px 0 10px;
          @include wh(56px, 32px);
          position: relative;
          &::before {
            position: absolute;
            content: ".";
            top: -12px;
            left: 22.5px;
            color: #fff
          }
          &::after {
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            border-right: 8px solid transparent;
            border-left: 8px solid #fff;
            border-top: 8px solid transparent;
            right: -18px;
            bottom: -2px
          }
        }
        .dian {
          position: relative;
          color: #fff;
          height: 100%;
          text-align: center;
          &::before {
            position: absolute;
            content: ".";
            top: -12px;
            left: 10px;
            color: #fff
          }
          &::after {
            position: absolute;
            content: ".";
            top: -12px;
            right: 10px;
            color: #fff
          }
        }
        .num {
          margin: 0 20px;
        }
      }
      .carouselbox {
        width: 100%;
        height: 100%;
        z-index: 1;
        .carousel-item {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .img {
            width: 100%;
          }
        }
      }
      .content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;

        color: #fff;
        background: rgba(0, 0, 0, .3);
        z-index: 1;
        .title {
          display: flex;
          justify-content: space-between;
        }
        .currenttitle {
          flex: 1;
          font-size: 32px; /*px*/
        }
        .currentnum {
          width: 80px;
          text-align: right;
        }
        .description {
          padding: 20px 0;
          font-size: 28px; /*px*/
          color: #eee;
          overflow-y: auto;
          height: 320px;
        }
      }
    }
  }
</style>
