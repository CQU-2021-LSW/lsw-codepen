<template>
  <div>
    <el-input v-model="noteName"></el-input>
    <el-tabs type="border-card">
      <el-tab-pane label="HTML">
        <editor
          ref="myHTMLEditor"
          @init="editorInit"
          lang="html"
          :theme="theme"
          width="500"
          height="100"
        ></editor>
      </el-tab-pane>
      <el-tab-pane label="JavaScript">
        <editor
          ref="myJSEditor"
          @init="editorInit"
          lang="javascript"
          :theme="theme"
          width="500"
          height="100"
        ></editor>
      </el-tab-pane>
      <el-tab-pane label="CSS">
        <editor
          ref="myCSSEditor"
          @init="editorInit"
          lang="css"
          :theme="theme"
          width="500"
          height="100"
        ></editor>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="showResult()">RUN</el-button>
    <el-button type="danger" @click="submitCode()">SAVE</el-button>
    <!-- <el-button v-if="this.$store.state.noteId != null" @click="newCode()"
      >NEW</el-button
    > -->
    <el-button v-if="this.noteId != null" @click="newCode()">NEW</el-button>
    <a :href="download" ref="downloadLink">
      <el-button @click="downloadCode()"> DOWNLOAD </el-button>
    </a>
    <div id="log"></div>
    <el-select v-model="theme" placeholder="更换主题ヾ(•ω•`)o">
      <el-option
        v-for="item in themeArr"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="selected"
      multiple
      filterable
      allow-create
      placeholder="请选择额外库ヾ(•ω•`)o"
    >
      <el-option
        v-for="item in libs"
        :key="item.libId"
        :label="item.libName"
        :value="item.libContent"
      >
      </el-option>
    </el-select>
    <codemirror
      ref="myCm"
      v-model="consoleLogText"
      :options="cmOptions"
      class="code"
    ></codemirror>
    <iframe id="result" ref="result" height="1080px" width="720px"></iframe>
    <el-dialog :visible.sync="isShow">
      <el-input v-model="noteName"></el-input>
      <el-button @click="submit">确定</el-button>
      <el-button @click="!isShow">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
require("codemirror/mode/python/python.js");
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/brace-fold.js");
require("codemirror/addon/fold/xml-fold.js");
require("codemirror/addon/fold/indent-fold.js");
require("codemirror/addon/fold/markdown-fold.js");
require("codemirror/addon/fold/comment-fold.js");

import editor from "vue2-ace-editor";
import "brace/ext/language_tools"; //language extension prerequsite...
import "brace/mode/html";
import "brace/mode/javascript"; //language
import "brace/mode/css";
import "brace/theme/ambiance";
import "brace/theme/chaos";
import "brace/theme/chrome";
import "brace/theme/clouds";
import "brace/theme/clouds_midnight";
import "brace/theme/cobalt";
import "brace/theme/crimson_editor";
import "brace/theme/dawn";
import "brace/theme/dracula";
import "brace/theme/dreamweaver";
import "brace/theme/eclipse";
import "brace/theme/github";
import "brace/theme/gob";
import "brace/theme/gruvbox";
import "brace/theme/idle_fingers";
import "brace/theme/iplastic";
import "brace/theme/katzenmilch";
import "brace/theme/kr_theme";
import "brace/theme/kuroir";
import "brace/theme/merbivore";
import "brace/theme/merbivore_soft";
import "brace/theme/monokai";
import "brace/theme/mono_industrial";
import "brace/theme/pastel_on_dark";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/theme/sqlserver";
import "brace/theme/terminal";
import "brace/theme/textmate";
import "brace/theme/tomorrow";
import "brace/theme/tomorrow_night";
import "brace/theme/tomorrow_night_blue";
import "brace/theme/tomorrow_night_bright";
import "brace/theme/tomorrow_night_eighties";
import "brace/theme/twilight";
import "brace/theme/vibrant_ink";
import "brace/theme/xcode";
import "brace/snippets/javascript"; //snippet
import "brace/snippets/html"; //snippet
import "brace/snippets/css"; //snippet

export default {
  name: "aceEditor",
  data() {
    return {
      download: "",
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
    };
  },
  components: {
    editor,
    codemirror,
  },
  methods: {
    editorInit: function () {},
    getEditorValue: function (forName) {
      return this.$refs[forName].editor.getValue();
    },
    setEditorValue: function (forName, code) {
      return this.$refs[forName].editor.setValue(code);
    },
    getLibs() {
      // get 方法拿到
      this.$http
        .get("libs/getLibs")
        .then(({ data }) => {
          console.log(data);
          this.libs = data.data;
          console.log(this.libs);
        })
        .catch(() => {});
    },
    say() {
      this.$refs["myCm"].setValue("change");
    },
    getCode() {
      var HTMLContent =
        this.getEditorValue("myHTMLEditor") === undefined
          ? ""
          : this.getEditorValue("myHTMLEditor");
      var JSContent =
        this.getEditorValue("myJSEditor") === undefined
          ? ""
          : this.getEditorValue("myJSEditor");
      var CSSContent =
        this.getEditorValue("myCSSEditor") === undefined
          ? ""
          : this.getEditorValue("myCSSEditor");
      var code =
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n' +
        "<head>\n" +
        '  <meta charset="UTF-8">\n' +
        "  <title>Editor</title>\n";

      // 第三方库有内容
      if (this.selected.length != 0) {
        for (var i = 0; i < this.selected.length; i++) {
          code += "  " + this.selected[i] + "\n";
        }
      }
      code += "  <style>\n";
      code += CSSContent;
      code += "\n  </style>\n" + "</head>\n" + "<body>\n";
      code += HTMLContent;
      code += "\n  <script>\n";
      code += JSContent;
      code += "\n";
      // reason : 会把当作结束标签而产生语法错误。
      code += "  </scr" + "ipt>\n";
      code += "</body>\n";
      code += "</html>";
      return code;
    },
    showResult() {
      // todo
      var JSContent =
        this.getEditorValue("myJSEditor") === undefined
          ? ""
          : this.getEditorValue("myJSEditor");
      // 将console.log的值保存
      var consoleLogHelper =
        `var consoleLogData = [];\n` +
        `console.log = function (message) {
        if (typeof message == 'object') {
          consoleLogData.push(JSON && JSON.stringify ? JSON.stringify(message) : message);
        } else {
          consoleLogData.push(message);
        }
      } \n`;
      // 向父组件穿参
      var cmdHelper = `
      window.parent.postMessage({
        cmd: 'returnLog', 
        params: {
          success: true, 
          data: consoleLogData
        }});`;
      var resultJS = consoleLogHelper + JSContent + cmdHelper;
      // var code = this.getCode();
      var HTMLContent =
        this.getEditorValue("myHTMLEditor") === undefined
          ? ""
          : this.getEditorValue("myHTMLEditor");
      var CSSContent =
        this.getEditorValue("myCSSEditor") === undefined
          ? ""
          : this.getEditorValue("myCSSEditor");
      var code =
        "<!DOCTYPE html>\n" +
        '<html lang="en">\n' +
        "<head>\n" +
        '  <meta charset="UTF-8">\n' +
        "  <title>Editor</title>\n";

      // 第三方库有内容
      if (this.selected.length != 0) {
        for (var i = 0; i < this.selected.length; i++) {
          code += "  " + this.selected[i] + "\n";
        }
      }
      code += "  <style>\n";
      code += CSSContent;
      code += "\n  </style>\n" + "</head>\n" + "<body>\n";
      code += HTMLContent;
      code += "\n  <script>\n";

      //   todo
      //   code += "parent.$refs[\"myCm\"].setValue(\"change\")"

      code += resultJS;
      code += "\n";
      // reason : 会把当作结束标签而产生语法错误。
      code += "  </scr" + "ipt>\n";
      code += "</body>\n";
      code += "</html>";

      console.log(code);
      document.getElementById("result").setAttribute("srcdoc", code);
    },
    newCode() {
      // this.$store.state.noteId = null;
      this.noteId = null;
      this.$router.push({ name: "editorWithoutParams" });
    },
    downloadCode() {
      var code = this.getCode();
      var blob = new Blob([code], { type: "text/plain" });
      this.$refs["downloadLink"].download = this.noteName + ".html";
      this.$refs["downloadLink"].href = URL.createObjectURL(blob);
      // this.$refs["downloadLink"].click();
      URL.revokeObjectURL(blob);
    },
    submitCode() {
      // 未登录
      if (this.$store.state.isAuth == 0) {
        this.$message({
          message: "请先登录┗|｀O′|┛ 嗷~~",
        });
        return;
      }
      if (this.$store.state.isAuth == 1) {
        this.isShow = true;
        // if (this.isConfirm) {
        //   console.log(5454545);
        //   // 不是编辑状态 保存新数据
        //   // if (this.$store.state.noteId == null) {
        //   if (this.noteId == null) {
        //     console.log(this.$store.state.userId);
        //     this.$http({
        //       method: "post",
        //       url: "/notes/saveCode",
        //       data: {
        //         noteName: this.noteName,
        //         userId: this.$store.state.userId,
        //         htmlCode:
        //           this.getEditorValue("myHTMLEditor") === undefined
        //             ? ""
        //             : this.getEditorValue("myHTMLEditor"),
        //         jsCode:
        //           this.getEditorValue("myJSEditor") === undefined
        //             ? ""
        //             : this.getEditorValue("myJSEditor"),
        //         cssCode:
        //           this.getEditorValue("myCSSEditor") === undefined
        //             ? ""
        //             : this.getEditorValue("myCSSEditor"),
        //       },
        //     })
        //       .then(({ data }) => {
        //         if (data && data.code === 0) {
        //           console.log(data);
        //           this.$message({
        //             message: "保存成功┗|｀O′|┛ 嗷~~",
        //             type: "success",
        //           });
        //           this.$store.state.noteId = data.data.noteId;
        //           this.noteId = data.data.noteId;
        //           console.log(data);
        //           console.log(this.$store.state.noteId);
        //         } else {
        //           this.$message({
        //             message: "保存失败(∪.∪ )...zzz稍后再试或者联系作者",
        //             type: "warning",
        //           });
        //         }
        //       })
        //       .catch(({ error }) => {
        //         console.log(error);
        //       });
        //   } else {
        //     this.$http({
        //       method: "post",
        //       url: "/notes/updateCode",
        //       data: {
        //         // noteId: this.$store.state.noteId,
        //         noteId: this.noteId,
        //         noteName: this.noteName,
        //         userId: this.$store.state.userId,
        //         htmlCode:
        //           this.getEditorValue("myHTMLEditor") === undefined
        //             ? ""
        //             : this.getEditorValue("myHTMLEditor"),
        //         jsCode:
        //           this.getEditorValue("myJSEditor") === undefined
        //             ? ""
        //             : this.getEditorValue("myJSEditor"),
        //         cssCode:
        //           this.getEditorValue("myCSSEditor") === undefined
        //             ? ""
        //             : this.getEditorValue("myCSSEditor"),
        //       },
        //     })
        //       .then(({ data }) => {
        //         if (data && data.code === 0) {
        //           this.$message({
        //             message: "保存成功┗|｀O′|┛ 嗷~~",
        //             type: "success",
        //           });
        //         } else {
        //           this.$message({
        //             message: "保存失败(∪.∪ )...zzz稍后再试或者联系作者",
        //             type: "warning",
        //           });
        //         }
        //       })
        //       .catch(({ error }) => {
        //         console.log(error);
        //       });
        //   }
        // }
      }
    },
    submit() {
      this.isShow = !this.isShow;
      // if (this.isConfirm) {
      //     console.log(5454545);
      // 不是编辑状态 保存新数据
      // if (this.$store.state.noteId == null) {
      if (this.noteId == null) {
        console.log(this.$store.state.userId);
        this.$http({
          method: "post",
          url: "/notes/saveCode",
          data: {
            noteName: this.noteName,
            userId: this.$store.state.userId,
            htmlCode:
              this.getEditorValue("myHTMLEditor") === undefined
                ? ""
                : this.getEditorValue("myHTMLEditor"),
            jsCode:
              this.getEditorValue("myJSEditor") === undefined
                ? ""
                : this.getEditorValue("myJSEditor"),
            cssCode:
              this.getEditorValue("myCSSEditor") === undefined
                ? ""
                : this.getEditorValue("myCSSEditor"),
          },
        })
          .then(({ data }) => {
            if (data && data.code === 0) {
              console.log(data);
              this.$message({
                message: "保存成功┗|｀O′|┛ 嗷~~",
                type: "success",
              });
              this.$store.state.noteId = data.data.noteId;
              this.noteId = data.data.noteId;
              console.log(data);
              console.log(this.$store.state.noteId);
            } else {
              this.$message({
                message: "保存失败(∪.∪ )...zzz稍后再试或者联系作者",
                type: "warning",
              });
            }
          })
          .catch(({ error }) => {
            console.log(error);
          });
      } else {
        this.$http({
          method: "post",
          url: "/notes/updateCode",
          data: {
            // noteId: this.$store.state.noteId,
            noteId: this.noteId,
            noteName: this.noteName,
            userId: this.$store.state.userId,
            htmlCode:
              this.getEditorValue("myHTMLEditor") === undefined
                ? ""
                : this.getEditorValue("myHTMLEditor"),
            jsCode:
              this.getEditorValue("myJSEditor") === undefined
                ? ""
                : this.getEditorValue("myJSEditor"),
            cssCode:
              this.getEditorValue("myCSSEditor") === undefined
                ? ""
                : this.getEditorValue("myCSSEditor"),
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
            console.log(error);
          });
      }
      // }
    },

    function() {
      // var old = console.log;
      var logger = document.getElementById("log");
      console.log = function (message) {
        if (typeof message == "object") {
          logger.innerHTML +=
            (JSON && JSON.stringify ? JSON.stringify(message) : message) +
            "<br />";
        } else {
          logger.innerHTML += message + "<br />";
          console.log("what");
        }
      };
    },
  },
  created() {
    // 拿到三方库的信息
    this.getLibs();
  },
  mounted() {
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    window.addEventListener("message", this.handleMessage);
    this.iframeWin = this.$refs.result.contentWindow;
    console.log(this.$route.params);
    console.log(this.$store.state.userId);
    // if (this.$store.state.noteId != null && this.$store.state.userId != null) {
    if (
      this.$route.params.noteId != "undefined" &&
      this.$store.state.userId != null
    ) {
      this.noteId = this.$route.params.noteId;
      console.log(this.noteId);
      this.$http
        .get("notes/getNote", {
          params: {
            noteId: this.noteId,
          },
        })
        .then(({ data }) => {
          console.log(1111);
          console.log(data);
          this.noteName = data.data.noteName;
          this.setEditorValue(
            "myHTMLEditor",
            data.data.htmlCode == null ? "" : data.data.htmlCode
          );
          this.setEditorValue(
            "myJSEditor",
            data.data.jsCode == null ? "" : data.data.jsCode
          );
          this.setEditorValue(
            "myCSSEditor",
            data.data.cssCode == null ? "" : data.data.cssCode
          );
        });
    }
  },
  updated() {},
  handleMessage(event) {
    // 根据上面制定的结构来解析iframe内部发回来的数据
    const data = event.data;
    switch (data.cmd) {
      case "returnLog":
        if (data.params.success) {
          // 调用报名方法
          console.log("收到Iframe");
          console.log(data.params.data);
        } else {
          console.log("未收到Iframe");
          console.log(data.params);
        }
        break;
    }
  },
};
</script>