<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        slot="right-icon"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in channels"
        :key="index"
        :icon="(isEdit && !fixedChannels.includes(channel.id)) ? 'clear' : ''"
        @click="onRemoveChannel(channel)"
      >
        <span slot="text" class="text" :class="{currentActive: active == index}">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0]
    }
  },
  computed: {
    recommendChannels () {
      // 遍历数组 把符合条件的元素存储到新数组中
      return this.allChannels.filter(channel => {
        return !this.channels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // 找到满足条件的元素项
    //     const ret = this.channels.find(mychannel => {
    //       return mychannel.id === channel.id
    //     })
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      this.$bus.$emit('onAddChannel', channel)
    },
    onRemoveChannel (channel) {
      if (this.isEdit && !this.fixedChannels.includes(channel.id)) {
        this.$bus.$emit('onRemoveChannel', channel)
      }
    }
  },
  async created () {
    await this.loadAllChannels()
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  ::v-deep .grid-item {
    width: 160px;
    height: 86px;
    .van-icon-clear {
      position: absolute;
      top: -14px;
      right: -14px;
      font-size: 30px;
      z-index: 2;
      color: #cacaca;
    }
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      span.currentActive {
        color: red;
      }
    }
  }
  ::v-deep .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
    }
  }
}
</style>
