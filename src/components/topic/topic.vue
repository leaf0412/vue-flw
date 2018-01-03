<template>
  <div class="topic">
    <headTop :headTitle="titleName" class="zindex1"></headTop>

    <div class="box" id="topiced">
      <div v-for="(item, index) in subjects">

        <div class="mutiTitle" v-if="item.view=='multiTitle'">
          <img :src="item.content.bgImage" alt="">
        </div>

        <div class="text" v-else-if="item.view=='text'">
          <span>{{item.content.intro}}</span>
        </div>

        <div class="slider" v-else-if="item.view=='slider'">
          <swiper :options="swiperOption" class="swiper swiper-wrap">
            <swiper-slide v-for="(ele,i) in item.podItems" :key="i">
              <span class="title">{{ele.title}}</span>
              <img :src="ele.thumbnail" alt="" @click="toWhere(ele)"/>
            </swiper-slide>
          </swiper>
        </div>

        <div class="newslist" v-else>
          <topiclist
            :topiclist="item"
            :index='index'
            @toCarousel="toCarousel"
            @toArticle="toArticle"
            @toVideo="toVideo">
          </topiclist>
        </div>

        <div class="subtitle" v-if="index == 2">
          <a href="javascript:;" class="subnav" v-for="ele in havetitle"
             @click="toitem('item-'+ele.i)">{{ele.title}}</a>
        </div>

      </div>

      <transition name="backtop">
        <div class="to-top" @click="backTop" v-if="showBackStatus"></div>
      </transition>

      <transition name="router-slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from '../commen/head'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getarticle} from "../../service/getData"
  import {getUrl, dealurl, getOuterHeight, animate, showBack} from '../../config/mUtils'
  import topiclist from '../../components/commen/topiclist'

  export default {
    data() {
      return {
        titleName: '专题',
        subjects: [],
        havetitle: [],
        swiperOption: {
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          notNextTick: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          }
        },
        showBackStatus: false
      }
    },
    created() {
      this.init()
    },
    mounted() {
      showBack(status => {
        this.showBackStatus = status
      })
    },
    methods: {
      async init() {
        if(this.$route.path == '/topic'){
          let url = getUrl(this.$route.query)

          let response = await getarticle(url)

          this.subjects = response.data.body.subjects
          this.subjects.forEach((ele, index) => {
            ele.i = index
          })
          this.havetitle = this.subjects.filter((ele) => {
            return ele.title
          })
        }
      },
      toitem(id) {
        let anchor = document.getElementById(id)
        let ele = document.getElementById('list-' + id.split("-")[1])
        let eleHeight = getOuterHeight(ele)
        let clientHeight = document.documentElement.clientHeight
        let top = anchor.offsetTop - getOuterHeight(anchor)
        if (eleHeight < clientHeight) {
          top = top - (clientHeight - eleHeight)
        }
        animate(document.body, {scrollTop: top}, 300, 'ease-out')
      },
      toCarousel(params) {
        if (params.indexOf(".com/") > 0) {
          this.$router.push('/topic/carousel?' + dealurl(params))
        } else {
          this.$router.push('/topic/carousel?' + params)
        }
      },

      toArticle(params) {
        this.$router.push('/topic/HotArticle?' + params)
      },

      toVideo(params) {
        this.$router.push('/topic/video?' + params)
      },
      toWhere(ele) {
        if(ele.links[0].type === 'slide'){
          this.toCarousel(ele.links[0].url)
        }else if(ele.links[0].type === 'video'){
          this.toVideo(dealurl(ele.mp4))
        }
      },
      backTop() {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
      }
    },
    components: {
      headTop,
      swiper,
      swiperSlide,
      topiclist
    },
    watch: {
      '$route' (to, from) {
        if(to.path == '/topic' &&  from.path == '/topic/carousel'){
          this.init()
        }
        if(to.path == '/topic'){
          document.body.scrollTop = 0
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/style/mixin";

  .topic {
    background-color: #fff;
    overflow: auto;
    .box {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 82px;
      .mutiTitle {
        width: 100%;
        img {
          width: 100%;
          height: 150px;
        }
      }
      .text {
        margin: 60px;
        display: block;
        font-size: 32px; /*px*/
      }
      .swiper {
        height: 420px;
        width: 100%;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .title {
          position: absolute;
          bottom: 0;
          left: 20px;
          font-size: 36px; /*px*/
          color: #fff;
        }
      }
      .subtitle {
        margin: 60px 20px;
        .subnav {
          display: inline-block;
          padding: 10px 20px;
          border: 1px solid #eee;
          font-size: 28px; /*px*/
        ;
          margin: 10px;
          border-radius: 20px;
          color: #FF7256;
        }
      }
      .to-top {
        position: fixed;
        top: 80%;
        left: 90%;
        transform: translate(-80%, -90%);
        width: 75px;
        height: 75px;
        background: url('../../assets/img/top.png') no-repeat;
        background-size: 100% 100%;
        background-color: #fff;
        border-radius: 1rem;
      }
    }
  }
</style>
