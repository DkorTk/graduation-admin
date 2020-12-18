<template>
  <div>
    <el-dialog
      :title="isEdit == false ? '修改宠物信息' : '添加宠物信息'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <div class="name">
          <el-form-item label="宠物昵称" :label-width="formLabelWidth">
            <el-input
              class="petNameInput"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>

        <div class="species">
          <el-form-item label="宠物种类">
            <el-select
              class="petSelect"
              v-model="form.animal"
              placeholder="请选择动物"
            >
              <el-option label="猫" value="cat"></el-option>
              <el-option label="狗" value="dog"></el-option>
            </el-select>
            <el-input
              class="petSelectInput"
              v-model="form.species"
              autocomplete="off"
              placeholder="请输入品种"
            ></el-input>
          </el-form-item>
        </div>

        <div class="name">
          <el-form-item label="宠物年龄" :label-width="formLabelWidth">
            <el-input
              class="petNameInput"
              v-model="form.age"
              placeholder="岁"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>

        <div class="name">
          <el-form-item label="宠物体重" :label-width="formLabelWidth">
            <el-input
              class="petNameInput"
              v-model="form.weight"
              placeholder="kg"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item
          class="sex"
          label="宠物性别"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="公" value="1"></el-option>
            <el-option label="母" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="sex"
          label="疫苗情况"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.vaccine" placeholder="请选择">
            <el-option label="已接种" value="1"></el-option>
            <el-option label="未接种" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          class="sex"
          label="驱虫情况"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.exParasite" placeholder="请选择">
            <el-option label="已驱虫" value="1"></el-option>
            <el-option label="未驱虫" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          class="sex"
          label="绝育情况"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.sterilization" placeholder="请选择">
            <el-option label="已绝育" value="1"></el-option>
            <el-option label="未绝育" value="0"></el-option>
          </el-select>
        </el-form-item>

        <div class="name">
          <el-form-item label="所属机构" :label-width="formLabelWidth">
            <el-input
              class="petNameInput"
              v-model="form.organization"
              placeholder="输入机构名称"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>

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
            <span class="hint"> 按住Ctrl可多选 </span>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" icon="el-icon-refresh" @click="resetPet()"
          >清空</el-button
        >
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createPet, setPetInfo } from "../api/pet";
import { uploadImage } from "../api/upImage";
import { catImage } from "../api/catImage";
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        species: "",
        animal: "",
        sex: "",
        age: "",
        weight: "",
        vaccine: "",
        exParasite: "",
        sterilization: "",
        organization: "",
      },
      formLabelWidth: "80px",
      wantPhotos: [],
      catPhotos: [],
      info: {},
      isEdit: '',
      animal: ''
    };
  },

  methods: {
    open () {
      // console.log("执行到了这");
      if (this.isEdit) {
        this.form = {
          name: "",
          species: "",
          animal: "",
          sex: "",
          age: "",
          weight: "",
          vaccine: "",
          exParasite: "",
          sterilization: "",
          organization: "",
        }
      }
      else {
        this.form = this.info
      }

      this.dialogFormVisible = true;
    },
    saveImg (e) {
      if (this.form.animal == "dog") {
        console.log(e.target.files);
        this.wantPhotos.push(...Array.from(e.target.files));
        console.log(this.wantPhotos);
      } else if (this.form.animal == "cat") {
        console.log(e.target.files);
        this.catPhotos.push(...Array.from(e.target.files));
        console.log("saveImage执行到cat");
      }

    },
    resetPet () {
      (this.form.name = ""),
        (this.form.species = ""),
        (this.form.animal = ""),
        (this.form.sex = ""),
        (this.form.age = ""),
        (this.form.weight = ""),
        (this.form.vaccine = ""),
        (this.form.exParasite = ""),
        (this.form.sterilization = ""),
        (this.form.organization = ""),
        (this.wantPhotos = []),
        (this.catPhotos = []);
    },
    saveOrUpdate () {
      debugger
      this.isEdit
      if (this.form.name.length === 0) {
        this.$message.error("请输入宠物昵称！");
      } else if (this.isEdit) {
        // 添加信息
        createPet(this.form).then((result) => {
          this.dialogFormVisible = false;
          this.$message.success("添加成功");
          // 调用父组件监听函数
          this.$emit("onSaveSuccess");
          console.log(result);
        });
      }
      else {
        //修改信息
        setPetInfo(this.form).then((result) => {
          this.dialogFormVisible = false;
          this.$message.success("修改成功");
          this.$emit("onSaveSuccess");
          console.log(result);
        })
        // 添加狗图片
        if (this.form.animal == "dog") {
          for (const photo of this.wantPhotos) {
            console.log("photo", photo);
            uploadImage(photo);
          }
        } else if (this.form.animal == "cat") {
          for (const photo of this.catPhotos) {
            console.log("photo执行到cat");
            catImage(photo);
          }
        }
      }
    },
    restWorkData () {
      this.form = {}
    },
  },
};
</script>

<style lang="scss" scoped>
.name {
}
.name::after {
  display: block;
  content: "";
  clear: both;
}
.species {
}
.petNameInput {
  float: left;
  width: 40%;
  margin-left: 15px;
}
.petSelect {
  width: 35%;
  margin-right: 15px;
}
.petSelectInput {
  width: 40%;
}

/deep/.sex {
  display: flex;
}
</style>
