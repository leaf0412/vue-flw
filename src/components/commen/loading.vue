<template>
  <div class="loading">
    <div class="loader-more" v-show="!loadernone">正在加载更多...</div>
    <div class="loader-none" v-show="loadernone">已经全部加载完毕</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'loading',
    props: {
      loadernone: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
