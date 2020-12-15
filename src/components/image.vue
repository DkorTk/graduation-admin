<template>
  <div>
    <el-dialog title="新增宠物" :visible.sync="dialogFormVisible">
      <!-- 上传按钮 -->
      <div class="showContainer">
        <div class="uploadContainer">
          <span class="fileinput-button">
            <span>上传图片</span>
            <input
              class="imgFile"
              type="file"
              name=""
              multiple="multiple"
              @input="saveImg"
            />
          </span>
          <span class="hint">
            按住Ctrl可多选
          </span>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="startUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from "../api/upImage";
export default {
  data() {
    return {
      dialogFormVisible: false,
      wantPhotos: [],
    };
  },
  methods: {
    open() {
      console.log("执行到了这");
      this.dialogFormVisible = true;
    },
    saveImg(e) {
      console.log(e.target.files);

      this.wantPhotos.push(...Array.from(e.target.files));
      console.log(this.wantPhotos);
    },
    startUpload() {
      console.log("到startUpload了");
      for (const photo of this.wantPhotos) {
        console.log("photo", photo);
        uploadImage(photo);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
