<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs class="channel-tab" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
      <!-- <component :is="comName"></component> -->
      <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div
          class="hamberger-btn"
          @click="isChannelEditShow = true"
        >
          <i class="iconfont icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 图标位置 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit :channels="channels" :active="active"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
// import login from '@/views/login'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      // comName: 'login'
      isChannelEditShow: false
    }
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    },
    onAddChannel (channel) {
      this.channels.push(channel)
    },
    onRemoveChannel (channel) {
      this.channels = this.channels.filter(mychannel => mychannel.id !== channel.id)
    }
  },
  async created () {
    await this.loadChannels()
  },
  mounted () {
    this.$bus.$on('onAddChannel', this.onAddChannel)
    this.$bus.$on('onRemoveChannel', this.onRemoveChannel)
  },
  components: {
    // login
    ArticleList,
    ChannelEdit
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  ::v-deep .channel-tab {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 80px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      .van-tab__text {
        font-size: 28px;
        color: #777;
      }
    }
    .van-tab--active {
      .van-tab__text {
        font-size: 30px;
        color: #333;
      }
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      bottom: 9px;
      background-color: #3296fa;
      border-radius: 3px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 58px;
      height: 80px;
    }
    .hamberger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: .902;
      i.iconfont {
        font-size: 40px;
        color: #333;
      }
      &::before{
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
