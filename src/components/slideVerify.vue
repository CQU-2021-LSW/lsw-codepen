<template>
  <div class="drag" ref="dragDiv">
    <div class="drag_bg"></div>
    <div class="drag_text">{{confirmWords}}</div>
    <div ref="moveDiv" 
      @mousedown="mousedownFn($event)" 
      class="handler" 
      style="position: absolute;top: 0px;left: 0px;">
      <i v-if="confirmSuccess" class="el-icon-finished"></i>
      <i v-else class="el-icon-d-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      beginClientX:0, //距离屏幕左端距离
      mouseMoveStata:false, //触发拖动状态判断
      maxwidth:'', //拖动最大宽度，依据滑块宽度算出来的
      confirmWords:'拖动滑块验证', //滑块文字
      confirmSuccess:false //验证成功判断
    }
  },
  methods: {
    mousedownFn:function (e) {
      if(!this.confirmSuccess) {
        e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true;
        this.beginClientX = e.clientX;
      }
    }, //mousedoen 事件
    successFunction() {
      this.confirmSuccess = true
      this.$store.state.isVerify = true
      this.confirmWords = '验证通过';
      if(window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove',this.mouseMoveFn);
        document.getElementsByTagName('html')[0].removeEventListener('mouseup',this.moseUpFn);
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup',()=>{});
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#fff'
      document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
      document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
    }, //验证成功函数
    mouseMoveFn(e) {
      if(this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX;
        if(width>0 && width<=this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = width + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
        }else if(width>this.maxwidth) {
          this.successFunction();
        }
      }
    }, //mousemove事件
    moseUpFn(e){
      this.mouseMoveStata = false;
      var width = e.clientX - this.beginClientX;
      if(width<this.maxwidth) {
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
      }
    } //mouseup事件
  },
  mounted() {
    this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
    document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)
  }
}
</script>

<style scoped>
.drag{
  position: relative;
  background-color: #c0c0c0;
  width: 100%;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
.handler{
  width: 40px;
  height: 34px;
  left: 0px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: move;
}
.drag_bg{
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
}
.drag_text{
  position: absolute;
  top: 0px;
  width: 100%;text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select:none;
  -ms-user-select:none;
}
</style>
