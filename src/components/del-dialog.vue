<template>
  <div class="delDialog">
    <el-dialog
      title="Tips"
      width="30%"
      :visible.sync="visible"
      @close="delCancel"
    >
      <!-- @close="delCancel" -->
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">Cancel</el-button>
        <el-button type="primary" @click="delConfirm">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "del-dialog",
  props: ["clikedId", "preId"],
  data() {
    return {
      visible: true,
    };
  },
  created() {
    console.log(this.clikedId);
  },
  methods: {
    delCancel() {
      //   this.visible = false;
      this.$emit("cancelDel");
    },
    delConfirm() {
      let _this = this;
      this.$http({
        method: "post",
        url: "/comments/delComment",
        data: { commentIds: [this.clikedId] },
      }).then((res) => {
        console.log(res);
        console.log(_this.preId);
        if (_this.preId != 0) {
          console.log("阿欧");
          this.$emit("deled");
        }
        this.visible = false;
        location.reload();
      });

      //   location.reload();
    },
  },
};
</script>
