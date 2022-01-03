<template>
  <div id="bg">
    <div id="left">
      <el-tabs type="card" id="input">
        <el-tab-pane label="HTML">
          <div class="tab">
            <editor ref="myHTMLEditor" @init="editorInit" lang="html" :theme="theme"></editor>
          </div>
        </el-tab-pane>
        <el-tab-pane label="JavaScript">
          <div class="tab">
            <editor ref="myJSEditor" @init="editorInit" lang="javascript" :theme="theme"></editor>
          </div>
        </el-tab-pane>
        <el-tab-pane label="CSS">
          <div class="tab">
            <editor ref="myCSSEditor" @init="editorInit" lang="css" :theme="theme"></editor>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="right">
      <div id="header">
        <el-button type="primary" @click="showResult"><i class="el-icon-video-play"></i>RUN</el-button>
        <el-button type="danger" @click="saveCode"><i class="el-icon-upload"></i>SAVE</el-button>
        <!--<el-button v-if="this.noteId != null" @click="newCode()">NEW</el-button>-->
        <a ref="downloadLink">
          <el-button type="warning" @click="downloadCode"><i class="el-icon-download"></i>DOWNLOAD</el-button>
        </a>
        <el-button id="user-btn" type="success" @click="toUser"><i class="el-icon-s-custom"></i>&emsp;{{getName}}</el-button>
      </div>
      <!--<el-input v-model="noteName"></el-input>-->
      <div id="select">
        <el-tag>编辑框主题:</el-tag>
        <span id="theme">
        <el-select v-model="theme" placeholder="更换主题ヾ(•ω•`)o">
          <el-option v-for="item in themeArr" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        </span>
        <el-tag type="danger">额外JS库:</el-tag>
        <el-select v-model="selected" multiple collapse-tags placeholder="请选择额外库ヾ(•ω•`)o">
          <el-option v-for="item in libs" :key="item.libId" :label="item.libName" :value="item.libContent"></el-option>
        </el-select>
      </div>
      <codemirror ref="myCm" v-model="consoleLogText" :options="cmOptions" class="code"></codemirror>
      <div class="frame">
        <iframe id="result" ref="result" width="99%" height="99%" ></iframe>
      </div>
      <el-dialog :visible.sync="isShow" title="保存到云端" width="30%" center>
        <div class="dialog">
          <el-tag id="tag" type="warning">请输入项目名:</el-tag>
          <div class="name"><el-input v-model="noteName"></el-input></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit"><i class="el-icon-check"></i>确定</el-button>
          &emsp;&emsp;&emsp;
          <el-button type="danger" @click="isShow = false"><i class="el-icon-close"></i>取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror"
require("codemirror/mode/python/python.js")
require("codemirror/addon/fold/foldcode.js")
require("codemirror/addon/fold/foldgutter.js")
require("codemirror/addon/fold/brace-fold.js")
require("codemirror/addon/fold/xml-fold.js")
require("codemirror/addon/fold/indent-fold.js")
require("codemirror/addon/fold/markdown-fold.js")
require("codemirror/addon/fold/comment-fold.js")
import editor from "vue2-ace-editor"
import "brace/ext/language_tools" //language extension prerequsite...
import "brace/mode/html"
import "brace/mode/javascript" //language
import "brace/mode/css"
import "brace/theme/ambiance"
import "brace/theme/chaos"
import "brace/theme/chrome"
import "brace/theme/clouds"
import "brace/theme/clouds_midnight"
import "brace/theme/cobalt"
import "brace/theme/crimson_editor"
import "brace/theme/dawn"
import "brace/theme/dracula"
import "brace/theme/dreamweaver"
import "brace/theme/eclipse"
import "brace/theme/github"
import "brace/theme/gob"
import "brace/theme/gruvbox"
import "brace/theme/idle_fingers"
import "brace/theme/iplastic"
import "brace/theme/katzenmilch"
import "brace/theme/kr_theme"
import "brace/theme/kuroir"
import "brace/theme/merbivore"
import "brace/theme/merbivore_soft"
import "brace/theme/monokai"
import "brace/theme/mono_industrial"
import "brace/theme/pastel_on_dark"
import "brace/theme/solarized_dark"
import "brace/theme/solarized_light"
import "brace/theme/sqlserver"
import "brace/theme/terminal"
import "brace/theme/textmate"
import "brace/theme/tomorrow"
import "brace/theme/tomorrow_night"
import "brace/theme/tomorrow_night_blue"
import "brace/theme/tomorrow_night_bright"
import "brace/theme/tomorrow_night_eighties"
import "brace/theme/twilight"
import "brace/theme/vibrant_ink"
import "brace/theme/xcode"
import "brace/snippets/javascript" //snippet
import "brace/snippets/html" //snippet
import "brace/snippets/css" //snippet

export default {
  name: "aceEditor",
  data() {
    return {
      // download: "",
      noteId: null,
      noteName: "UNTITLE",
      isShow: false,
      // isConfirm: false,
      libs: [],
      theme: "chrome", // default
      // content:null
      themeArr: [
        //将brace/theme文件夹下的所有主题名字拷贝出来
        "ambiance",
        "chaos",
        "chrome",
        "clouds",
        "clouds_midnight",
        "cobalt",
        "crimson_editor",
        "dawn",
        "dracula",
        "dreamweaver",
        "eclipse",
        "github",
        "gob",
        "gruvbox",
        "idle_fingers",
        "iplastic",
        "katzenmilch",
        "kr_theme",
        "kuroir",
        "merbivore",
        "merbivore_soft",
        "monokai",
        "mono_industrial",
        "pastel_on_dark",
        "solarized_dark",
        "solarized_light",
        "sqlserver",
        "terminal",
        "textmate",
        "tomorrow",
        "tomorrow_night",
        "tomorrow_night_blue",
        "tomorrow_night_bright",
        "tomorrow_night_eighties",
        "twilight",
        "vibrant_ink",
        "xcode",
      ],
      iframeWin: null,
      selected: [],
      consoleLogText: "",
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { Ctrl: "autocomplete" },
        lineWiseCopyCut: true,
        showCursorWhenSelecting: true,
        matchBracket: true,
        line: true,
      },
    }
  },
  components: {
    editor,
    codemirror,
  },
  computed: {
    getName() {
      if(this.$store.state.isAuth === 0){
        return '请登录'
      } else {
        return this.$store.state.userName
      }
    }
  },
  beforeDestroy() {
    this.$store.state.isEditor = false
  },
  methods: {
    toUser() {
      if(this.$store.state.isAuth === 1) {
        this.$router.push({ path: "/user-hub" })
      } else {
        this.$store.state.isCache = true
        var text = this.getAllText()
        localStorage.setItem('html', text.HTMLContent)
        localStorage.setItem('js', text.JSContent)
        localStorage.setItem('css', text.CSSContent)
        this.$router.push({ path: "/login" })
      }
    },
    getAllText() {
      var HTMLContent =
        this.getEditorValue("myHTMLEditor") === undefined
          ? ""
          : this.getEditorValue("myHTMLEditor")
      var JSContent =
        this.getEditorValue("myJSEditor") === undefined
          ? ""
          : this.getEditorValue("myJSEditor")
      var CSSContent =
        this.getEditorValue("myCSSEditor") === undefined
          ? ""
          : this.getEditorValue("myCSSEditor")
      return {HTMLContent: HTMLContent, JSContent: JSContent, CSSContent: CSSContent}
    },
    editorInit: function () {},
    getEditorValue(forName) {
      return this.$refs[forName].editor.getValue()
    },
    setEditorValue(forName, code) {
      return this.$refs[forName].editor.setValue(code)
    },
    getLibs() {
      // get 方法拿到
      this.$http
        .get("libs/getLibs")
        .then(({ data }) => {
          this.libs = data.data
          console.log('获取js库')
          console.log(this.libs)
        })
        .catch(() => {})
    },
    /*say() {
      this.$refs["myCm"].setValue("change")
    },*/
    getCode() {
      var text = this.getAllText()
      var code =
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n' +
        "<head>\n" +
        '  <meta charset="UTF-8">\n' +
        "  <title>Editor</title>\n"
      // 第三方库有内容
      if (this.selected.length != 0) {
        for (var i = 0; i < this.selected.length; i++) {
          code += "  " + this.selected[i] + "\n"
        }
      }
      code += "  <style>\n"
      code += text.CSSContent
      code += "\n  </style>\n" + "</head>\n" + "<body>\n"
      code += text.HTMLContent
      code += "\n  <script>\n"
      code += text.JSContent
      code += "\n"
      // reason : 会把当作结束标签而产生语法错误。
      code += "  </scr" + "ipt>\n"
      code += "</body>\n"
      code += "</html>"
      return code
    },
    showResult() {
      // todo
      var text = this.getAllText()
      var JSContent = text.JSContent
      // 将console.log的值保存
      /*var consoleLogHelper =
        `var consoleLogData = [];\n` +
        `console.log = function (message) {
        if (typeof message == 'object') {
          consoleLogData.push(JSON && JSON.stringify ? JSON.stringify(message) : message);
        } else {
          consoleLogData.push(message);
        }
      } \n`
      // 向父组件穿参
      var cmdHelper = `
      window.parent.postMessage({
        cmd: 'returnLog', 
        params: {
          success: true, 
          data: consoleLogData
        }});`*/
      var resultJS = JSContent// + consoleLogHelper +  cmdHelper
      // var code = this.getCode()
      var HTMLContent = text.HTMLContent
      var CSSContent = text.CSSContent
      var code =
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n' +
        "<head>\n" +
        '  <meta charset="UTF-8">\n' +
        "  <title>Editor</title>\n"
      // 第三方库有内容
      if (this.selected.length != 0) {
        for (var i = 0; i < this.selected.length; i++) {
          code += "  " + this.selected[i] + "\n"
        }
      }
      code += "  <style>\n"
      code += CSSContent
      code += "\n  </style>\n" + "</head>\n" + "<body>\n"
      code += HTMLContent
      code += "\n  <script>\n"
      //   todo
      //   code += "parent.$refs[\"myCm\"].setValue(\"change\")"
      code += resultJS
      code += "\n"
      // reason : 会把当作结束标签而产生语法错误。
      code += "  </scr" + "ipt>\n"
      code += "</body>\n"
      code += "</html>"
      console.log(code)
      document.getElementById("result").setAttribute("srcdoc", code)
    },
    /*newCode() {
      this.$store.state.noteId = null
      this.noteId = this.$store.state.noteId
      // this.noteId = null;
      this.$router.push({ name: "editorWithoutParams" })
    },*/
    downloadCode() {
      var code = this.getCode()
      var blob = new Blob([code], { type: "text/plain" })
      this.$refs["downloadLink"].download = this.noteName + ".html"
      this.$refs["downloadLink"].href = URL.createObjectURL(blob)
      URL.revokeObjectURL(blob)
    },
    saveCode() {
      // 未登录
      if (this.$store.state.isAuth === 0) {
        this.$message({ message: "请先登录┗|｀O′|┛ 嗷~~",})
      } else {
        this.isShow = true
      }
    },
    submit() {
      this.isShow = false
      var text = this.getAllText()
      if (this.noteId === null) {
        console.log(this.$store.state.userId)
        this.$http({
          method: "post",
          url: "/notes/saveCode",
          data: {
            noteName: this.noteName,
            userId: this.$store.state.userId,
            htmlCode: text.HTMLContent,
            jsCode: text.JSContent,
            cssCode: text.CSSContent,
          },
        })
          .then(({ data }) => {
            if (data && data.code === 0) {
              console.log(data)
              this.$message({
                message: "保存成功┗|｀O′|┛ 嗷~~",
                type: "success",
              })
              this.$store.state.noteId = data.data.noteId
              this.noteId = data.data.noteId
              console.log(this.$store.state.noteId)
            } else {
              this.$message({
                message: "保存失败(∪.∪ )...zzz稍后再试或者联系作者",
                type: "warning",
              })
            }
          })
          .catch(({ error }) => {
            console.log(error)
          })
      } else {
        this.$http({
          method: "post",
          url: "/notes/updateCode",
          data: {
            // noteId: this.$store.state.noteId,
            noteId: this.noteId,
            noteName: this.noteName,
            userId: this.$store.state.userId,
            htmlCode: text.HTMLContent,
            jsCode: text.JSContent,
            cssCode: text.CSSContent,
          },
        })
          .then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "保存成功┗|｀O′|┛ 嗷~~",
                type: "success",
              });
            } else {
              this.$message({
                message: "保存失败(∪.∪ )...zzz稍后再试或者联系作者",
                type: "warning",
              });
            }
          })
          .catch(({ error }) => {
            console.log(error)
          })
      }
      // }
    },
    getNote() {
      // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
      window.addEventListener("message", this.handleMessage)
      this.iframeWin = this.$refs.result.contentWindow
      console.log('进入editor，uid&noteid:')
      console.log(this.$store.state.userId)
      console.log(this.noteId)
      if (this.$store.state.userId !== null && this.noteId !== null) {
        this.$http.get("notes/getNote", { params: { noteId: this.noteId } })
          .then(({ data }) => {
            console.log('从云端获取到代码')
            console.log(data)
            this.noteName = data.data.noteName
            this.setEditorValue(
              "myHTMLEditor",
              data.data.htmlCode == null ? "" : data.data.htmlCode
            )
            this.setEditorValue(
              "myJSEditor",
              data.data.jsCode == null ? "" : data.data.jsCode
            )
            this.setEditorValue(
              "myCSSEditor",
              data.data.cssCode == null ? "" : data.data.cssCode
            )
          })
      }
      else if (this.$store.state.userId !== null && this.$store.state.isCache) {
        this.noteName = "UNTITLED"
        this.setEditorValue("myHTMLEditor", localStorage.getItem('html'))
        this.setEditorValue("myJSEditor", localStorage.getItem('js'))
        this.setEditorValue("myCSSEditor", localStorage.getItem('css'))
        localStorage.removeItem('html')
        localStorage.removeItem('js')
        localStorage.removeItem('css')
        this.$store.state.isCache = false
        console.log('成功读取本地缓存代码')
      } else {
        this.noteName = "UNTITLED"
        this.setEditorValue("myHTMLEditor", "")
        this.setEditorValue("myJSEditor", "")
        this.setEditorValue("myCSSEditor", "")
      }
    },
    function() {
      var logger = document.getElementById("log")
      console.log = function (message) {
        if (typeof message == "object") {
          logger.innerHTML +=
            (JSON && JSON.stringify ? JSON.stringify(message) : message) +
            "<br />"
        } else {
          logger.innerHTML += message + "<br />"
          console.log("what")
        }
      }
    },
  },
  /*watch: {
    $route: "getNote",
  },*/
  created() {
    // 拿到三方库的信息
    this.getLibs()
    this.noteId = this.$store.state.noteId
    this.$store.state.isEditor = true
    // this.getNote()
  },
  mounted() {
    this.getNote()
  },
  handleMessage(event) {
    // 根据上面制定的结构来解析iframe内部发回来的数据
    const data = event.data
    switch (data.cmd) {
      case "returnLog":
        if (data.params.success) {
          // 调用报名方法
          console.log("收到Iframe")
          console.log(data.params.data)
        } else {
          console.log("未收到Iframe")
          console.log(data.params)
        }
        break;
    }
  },
};
</script>

<style scoped>
#bg{
  height: 100%;
  display: flex;
  flex-direction: row;
}
#left{
  display: flex;
  flex-direction: column;
  width: 50%;
  border-style: dashed;
  border-radius: 15px;
  border-color: pink;
  margin: 0px 5px 0px 0px;
  padding: 5px;
}
#right{
  display: flex;
  flex-direction: column;
  width: 50%;
  border-style: dashed;
  border-radius: 15px;
  border-color: pink;
  margin: 0px 0px 0px 5px;
  padding: 5px;
}
#input{
  height: 100%;
  width: 100%;
}
.tab{
  height: 88vh;
  width: 100%;
}
.code{
  display: none;
}
#select{
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 10px 5px 0px;
}
.el-button{
  margin: 0px 10px 0px 0px;
}
.el-tag{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 14px;
  margin: 0px 5px 0px 0px;
}
#user-btn{
  /*position: relative;
  right: 0px;*/
  float: right;
  margin: 0px;
}
.frame{
  border-style: dashed;
  border-radius: 15px;
  border-color: rgb(220, 245, 130);
  padding: 5px;
  width: 98%;
  height: 100%;
}
#theme{
  width: 150px;
  margin: 0px 10px 0px 0px;
}
.name{
  width: 300px;
  height: 40px;
}
#tag{
  width: 100px;
  height: 40px;
  margin: 0px 10px 0px 0px;
}
.dialog{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>