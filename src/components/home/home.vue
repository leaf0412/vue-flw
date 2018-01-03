<template>
  <div class="home">

    <swiper :options="swiperOption" ref="bannerSwiper" class="swiper-wrap" v-if="swipers.length">
      <swiper-slide v-for="(item, index) in swipers" :key="index" v-if="item.type!='web'">
        <img :src="item.thumbnail" @click="toCarousel(item.id)">
        <span class="title">{{item.title}}</span>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="swipers.length > 1"></div>
    </swiper>

    <section class="topicbox">
      <div class="category" v-for="(item,index) in topic.item" @click="toTopic(item.id)">
        <img :src="item.thumbnail" alt="">
        <span class="title">{{item.title}}</span>
      </div>
    </section>

    <section class="project-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
    >
      <news-list
        :newslist="news.item"
        @toArticle="toArticle"
        @toCarousel="toCarousel"
        @toVideo="toVideo"
        @toTopic="toTopic"
      >
      </news-list>
    </section>

    <loading :loadernone="loadernone"></loading>

    <transition name="backtop">
      <div class="to-top" @click="backTop" v-if="showBackStatus"></div>
    </transition>

    <transition :name="transitionName" >
      <router-view></router-view>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import infiniteScroll from 'vue-infinite-scroll'
  import {getnews} from '../../service/getData'
  import NewsList from '../commen/newslist'
  import {dealurl,showBack,animate} from '../../config/mUtils'
  import Loading from '../commen/loading'

  export default {
    name: 'home',
    data() {
      return {
        swipers: [],
        news: [],
        topic: [],
        page: 1,
        busy: true,
        loadernone: false, //  没有数据提示
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          }
        },
        showBackStatus: false,
        transitionName:'router-slide'
      }
    },
    created() {
      this.init()
    },
    mounted(){
      showBack(status => {
        this.showBackStatus = status;
      })
    },
    methods: {
      async init() {
        let response = await getnews('TY43,FOCUSTY43,TYTOPIC', this.page++, '5.4.0')
        response.data.forEach((obj, index) => {
          if (obj.item) {
            let type = obj.type
            if (type === 'focus') {
              this.swipers = obj.item
            } else if (type === 'list') {
              this.news = obj
            } else if (type === 'tytopic') {
              this.topic = obj
            }
          }
        })
        this.busy = false
      },
      async loadMore(){
        this.busy = true;
        this.loadernone = false;
        if(this.page <= this.news.totalPage){
          let response = await getnews('TY43',this.page++,'5.4.0');
          this.news.item = [...this.news.item,...response.data[0].item];
        }else{
          this.loadernone = true;
          return false
        }
        this.busy = false;
      },
      toCarousel(params) {
        if (params.indexOf('.com') > 0) {
          this.$router.push({path: `/home/carousel?${dealurl(params)}`})
        } else {
          this.$router.push({path: '/home/carousel?' + params})
        }
      },
      toArticle(params){
        this.$router.push('/home/HotArticle?'+params)
      },
      toVideo(params){
        this.$router.push('/home/video?'+params)
      },
      toTopic(params) {
        this.$router.push('/topic?' + params)
      },
      backTop() {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
      }
    },
    watch: {
      '$route'(to, from) {
        this.transitionName = to.path.indexOf('video') > 0 ? 'router-right' : 'router-slide'
      }
    },
    directives: {infiniteScroll},
    components: {
      swiper,
      swiperSlide,
      NewsList,
      Loading
    }
  }
</script>

<style scoped lang="scss">
  @import '../../common/style/mixin';

  .home {
    width: 100%;
  }

  .swiper-wrap {
    height: 360px;
    width: 100%;
    position: relative;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 33.33%;
      font-size: 32px; /*px*/
      color: #fff;
    }
  }

  .topicbox {
    padding: 0 20px;
    margin: 40px 0 10px;
    display: flex;
    justify-content: space-between; /*两端对齐，项目之间的间隔都相等*/
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
      font-size: 32px; /*px*/
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

</style>
