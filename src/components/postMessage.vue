<template>
  <div class="act-form">
    <div class="nav">
      <div class="title">报名</div>
    </div>
    <div class="iframe-out">
      <iframe :src="src" ref="iframe" @load="iframeLoad"></iframe>
    </div>
    <div v-if="isLoaded" class="send-form"><div class="send" @click="sendMessage()">提交</div></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" rel="stylesheet/sass">
  @import "style.scss";
</style>

<script>

export default {
  data () {
    return {
      src: '',
      iframeWin: null,
      isLoaded: false,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>iframe Window</title>
    <style>
        body {
            background-color: #D53C2F;
            color: white;
        }
    </style>
</head>
<body>

    <h1>Hello there, i'm an iframe</h1>

    <scr`+ `ipt>
        // 向父vue页面发送信息
        window.parent.postMessage({
            cmd: 'returnHeight',
            params: {
              success: true,
              data: document.body.scrollHeight + 'px'
            }
        }, '*');

        // 接受父页面发来的信息
        window.addEventListener("message", function(event){
          var data = event.data;
          switch (data.cmd) {
            case 'getFormJson':
                // 处理业务逻辑
                break;
            }
        });
    </scr`+`ipt>
</body>
</html>`
    }
  },
  created () {
    document.getElementById("iframe").setAttribute("srcdoc", code);
    let matchFamily = this.$store.state.matchFamily
    this.src = process.env.BASE_URL + '/matches/' + matchFamily.match.id + '/act/' + matchFamily.act.id + '/joinweb?token=' + this.$store.state.token
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
    this.iframeWin = this.$refs.iframe.contentWindow
  },
  methods: {
    back () {
    },
    sendMessage () {
      this.iframeWin.postMessage({
        cmd: 'getFormJson',
        params: {}
      }, '*')
    },
    iframeLoad () {
    },
    async handleMessage (event) {
      const data = event.data
      switch (data.cmd) {
        case 'returnFormJson':
          if (data.params.success) {
            // 调用报名方法
            await this.enroll(data.params.data)
          } else {
            console.log('returnFormJson失败')
            console.log(data.params)
          }
          break
        case 'returnHeight':
          if (data.params.success) {
            this.$refs.iframe.height = data.params.data
            this.isLoaded = true
          }
          break
      }
    },
    async enroll (data) {
      let matchFamily = this.$store.state.matchFamily
      let result = await api.enroll(matchFamily.match.id, matchFamily.act.id, data)
      if (result.success) {
        if (result.data.status === 'no_pay') {
          // 更新缓存
          let resultMatch = await api.match(matchFamily.match.id, {})
          if (resultMatch.success) {
            this.$store.commit('SET_CURRENT_MATCH', resultMatch.data)
          }
          Toast({
            message: '报名成功',
            position: 'bottom'
          })
          this.$router.push('/match/' + matchFamily.match.id + '/mdetail')
        } else {
          console.log('需要跳转到支付页面')
        }
      }
    }
  }
}
</script>




