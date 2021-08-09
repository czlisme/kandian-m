<template>
  <div id="music-box">
    <!-- <audio src="~@/assets/audio/1.mp3" id="myAudio" controls>1123</audio> -->
    <div class="music-container">
      <div class="music-fengmian">
        <div class="music-pic">
          <img
            src="~@/assets/img/touxiang.jpg"
            alt=""
            width="100%"
            height="100%"
            object-fit="container"
          />
        </div>
      </div>
      <div class="music-control" :class="{'isshow':audioData.showList}">
        <div class="control-top">
          <div class="music-title"></div>
          <div class="control">
            <i class="iconfont icon-previous"></i>
            <i class="iconfont icon-pause" v-if="audioData.playing" @click="play"></i>
            <i class="iconfont icon-play" v-else @click="play"></i>
            <i class="iconfont icon-next"></i>
            <i class="iconfont icon-list"></i>
          </div>
          <div class="show-musicList"></div>
        </div>
        <div class="control-bottom">
          <div class="music-progress">
            <van-progress
              :percentage="75"
              pivot-color="#7232dd"
              color="linear-gradient(to right, #be99ff, #7232dd)"
            />
          </div>
          <div class="music-playMethod">
            <i class="iconfont icon-yinliang"></i>
            <i class="iconfont icon-shunxu"></i>
          </div>
        </div>
      </div>
      <div class="music-list-btn" @click="showMusicList">
        <div class="icon">
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let audio = ''
export default {
  data () {
    return {
      audioData: {
        playing: false,
        index: 0,
        id: 2,
        currtentTime: '00:00',
        tottalTotal: '00:00',
        bufferedScaleX: 0, // 缓存进度
        progressScaleX: 0, // 播放进度
        thumbTranslateX: 0, // 进度条滑块位置
        volume: 1, // 音量进度
        volumeX: 0, // 音量滑块位置
        thumbSlide: false, // 进度条滑块滑动时标记
        thumbVSlide: false, // 音量滑块滑动时标记
        error: '', // 报错内容
        playType: 1, // 播放类型：1-列表循环，2-随机播放，3-单曲循环
        showList: false // 播放列表是否展示
      },
      song: {
        index: 0,
        cover: '',
        src: 'https://www.0dutv.com/plug/down/up2.php/212877015.mp3',
        name: '',
        singer: '',
        time: ''
      },
      songList: [
        {
          id: 1,
          cover: '',
          src: 'https://www.0dutv.com/plug/down/up2.php/109717925.mp3',
          name: '',
          singer: '',
          time: ''
        },
        {
          id: 2,
          cover: '',
          src: 'https://www.0dutv.com/plug/down/up2.php/109717925.mp3',
          name: '',
          singer: '',
          time: ''
        },
        {
          id: 3,
          cover: '',
          src: '@/assets/audio/3.mp3',
          name: '',
          singer: '',
          time: ''
        },
        {
          id: 4,
          cover: '',
          src: '/assets/audio/4.mp3',
          name: '',
          singer: '',
          time: ''
        }
      ]
    }
  },
  methods: {
    getData () {
      // this.play()
    }, // 获取数据
    musicInit () {}, // 音频初始化
    play () {
      audio.src = this.song.src
      console.log(audio)
      if (!this.audioData.playing) {
        audio.play()
        this.audioData.playing = true
      } else {
        audio.pause()
        this.audioData.playing = false
      }
      // console.log(audio)
    }, // 控制播放暂停
    chosePlayMethod () {}, // 选择播放方式
    goLastMusic () {}, // 上一曲
    goNextMusic () {
      let playIndex = this.song.index
      playIndex++
      this.song.src = this.songList[playIndex].src
    }, // 下一曲
    showMusicList () {
      console.log(1)
      this.audioData.showList = true
    }, // 是否显示播放列表
    choseSong () {}, // 列表选择播放歌曲
    slideVolume () {}, // 控制音量滑块
    slideProgress () {} // 控制进度条滑块
  },
  mounted () {
    // this.getData()
  },
  created () {
    // audio.play()
    audio = document.createElement('audio')
  }
}
</script>

<style lang="less" scoped>
#music-box {
  .music-container {
    // border: 1px solid #770404;
    border-radius: 20px;
    height: 140px;
    display: flex;
    padding: 14px;
    box-sizing: border-box;
    .music-fengmian {
      position: relative;
      top: -50px;
      width: 112px;
      height: 112px;
      background-color: blue;
      margin-right: 20px;
      .music-pic {
        width: 100%;
        height: 100%;
        img {
          object-fit: fill;
          border-radius: 50%;
        }
      }
    }
    .music-control {
      width: 600px;
      border: 1px solid #000;
      background-color: aqua;
      // border: 1px solid #000;
      display: flex;
      flex-direction: column;
      .control-top {
        height: 80px;
        background-color: yellow;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .music-title {
          width: 300px;
          height: 40px;
          border: 1px solid #784545;
          margin-right: 20px;
        }
        .control {
          width: 230px;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            display: flex;
            flex: 1;
            font-size: 38px;
          }
          i.icon-play {
            font-size: 36px;
          }
          // height: 70px;
          // display: flex;
          // flex: 1;
        }
      }
      .control-bottom {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .music-progress {
          width: 300px;
        }
        .music-playMethod {
          width: 200px;
          display: flex;
          justify-content: center;
          .iconfont {
            font-size: 30px;
          }
        }
      }
    }
    .isshow {
      width: 0;
      height: 0;
      transition: .5s;
      overflow: hidden;
    }
    .music-list-btn {
      width:30px ;
      height: 140px;
      position: relative;
      right: 0;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -20px;
    }
  }
}
</style>
