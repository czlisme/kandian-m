<template>
  <div class="channel_edit_page">
    <!-- 我的频道 -->
    <van-cell :border="true" class="title">
      <div slot="title">
        <span>我的频道</span>
      </div>
      <van-button
      size="small"
      round
      color="#6aab9c"
      @click="isEdit = !isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-channel">
      <van-grid-item
      class="channel-item"
      v-for="(channel,index) in myChannels"
      :key="index"
      :text="channel.name"
      @click="channelHandle(channel, index)"
      >
        <!-- 当处于编辑状态时, 除固定频道以外的频道的icon显示出来 -->
        <div slot="icon" class="icon-close"
        v-show="isEdit && !fixChannelid.includes(channel.id)"
        >
        <van-icon name="close"></van-icon>
      </div>
        <span slot="text"
        :class="{active: active === index}"
        class="text"
        >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="true" class="title">
      <div slot="title">
        <span>推荐</span>
      </div>
    </van-cell>
    <van-grid :gutter="10"
    class="recommend-channel"
    >
      <van-grid-item
      v-for="(channel,index) in recommendChannels"
      :key="index"
      class="channel-item"
      :text="channel.name"
      icon="plus"
      @click="addChannel(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addMyChannel, deleteMyChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    // props 获得我的频道
    myChannels: {
      required: true,
      type: Array
    },
    // 根据props传来的active 高亮显示该频道
    active: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: [], // 存储从服务器器获取的所有频道
      fixChannelid: [0]
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        const res = this.myChannels.find(myChannels => {
          return myChannels.id === channel.id
        })
        return !res
      })
    },
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 加载所有频道
    async loadChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (error) {
        this.$toast({
          type: 'error',
          message: '获取频道数据失败'
        })
      }
    },
    // 处理添加我的频道逻辑
    // 如果用户已登录,将频道存储到线上
    // 如果用户没有的登录,将频道数据存储到本地
    async addChannel (channel) {
      // 将数据添加到视图
      this.myChannels.push(channel)
      // 如果处于登录
      if (this.user) {
        // 将频道存储到线上,但由于接口原因,返回还是推荐频道.
        try {
          await addMyChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          this.$toast({
            type: 'fail',
            message: '频道添加失败',
            position: 'top'
          })
        }
      } else {
        // 未登录存储到本地
        setItem('kandian_channels', this.myChannels)
      }
    },
    async channelHandle (channel, index) {
      // 频道点击事件
      // 如果不是编辑状态切换频道
      // 是编辑状态点击删除我的频道
      if (this.isEdit) {
        // 处于编辑状态 删除点击的频道事件
        if (this.fixChannelid.includes(channel.id)) {
          return
        }
        this.myChannels.splice(index, 1)
        // 将删除频道添加到线上
        if (this.user) {
          try {
            await deleteMyChannel(channel)
          } catch (error) {
            this.$toast({
              type: 'fail',
              msaage: '频道删除失败',
              position: 'top'
            })
          }
        } else {
          // 将删除的频道移出本地存储
          setItem('kandian_channels', this.myChannels)
        }
        // 保证频道处于高亮状态
        if (index < this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        // 处于切换频道事件
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel_edit_page {
  padding-top: 85px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #384e78;
    margin-bottom: 10px;
    font-size: 38px;
    .van-button {
      padding: 0 36px;
      // background-color: #ed6c78;
    }
    span {
      font-family:Arial, Helvetica, sans-serif;
    }
  }
  .channel-item {
    width: 160px;
    height: 86px;
  }
 /deep/ .van-grid-item__content {
    background-color: #f4f5f6;
    white-space: nowrap;
    .van-grid-item__text {
      color: #222;
      margin-top: unset;
    }
  }
  /deep/ .my-channel {
    .icon-close .van-icon-close {
      position: absolute;
      right: -90px;
      top: -35px;
      color: #cacaca;
      font-size: 30px;
      z-index: 2;
    }
    .text {
      font-size: 26px;
      font-weight: 500;
    }
  }
  .recommend-channel {
     /deep/ .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
      }
      .van-grid-item__text {
        margin-top: unset;
      }
    }
  }
  .active {
      color: #ed6c78;
  }
}
</style>
