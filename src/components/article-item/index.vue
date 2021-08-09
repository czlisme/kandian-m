<template>
  <div class="article-item">
    <!-- vant 单元格组件 -->
    <van-cell
    :title="article.title"
    :label="article.aut_name"
    >
      <!-- 文章标题渲染 -->
      <!-- van-multi-ellipsis--l2 vant组件自带类名 文字溢出两行时折行显示... -->
      <div class="article-title van-multi-ellipsis--l2" slot="title" >
        <span>{{article.title}}我双开的骄傲和降低阿济格爱打架卡进的到你家尽可能</span>
      </div>
      <!-- 标题下方内容渲染 -->
      <div class="label-info-wrap" slot="label">
        <!-- 当有三张封面时渲染 -->
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div class="cover-item"
            v-for="(img, index)  in article.cover.images"
            :key="index">
            <van-image
              class="cover-item-img"
              fit="cover"
              :src="img"
            >
              <template v-slot:error>图片加载失败</template>
            </van-image>
          </div>
        </div>
        <!-- 渲染作者评论时间 -->
        <div class="label-info">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}条评论</span>
          <span>{{article.pubdate | relativeTime}}</span>
        </div>
      </div>
      <!-- 当有一张封面时渲染 -->
      <div class="cover" v-if="article.cover.type === 1">
        <van-image
          slot="default"
          fit="cover"
          :src="article.cover.images[0]"
          class="right-img"
        >
          <template v-slot:error>图片加载失败</template>
        </van-image>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .article-title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-img {
    width: 100%;
    height: 146px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 5px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
  .label-info span{
    margin-right: 25px;
  }
}
</style>
