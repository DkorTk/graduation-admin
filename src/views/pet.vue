<template>
  <div>
    <Head />
    <div class="petTable">
      <el-form ref="form" :model="form" class="petForm">
        <el-form-item>
          <el-select placeholder="请选择宠物类别">
            <el-option label="猫" value="shanghai"></el-option>
            <el-option label="狗" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入宠物编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="upImage()"><i class="el-icon-search"></i>查询</el-button
          >
          <el-button @click="addPet()"
            ><i class="el-icon-circle-plus-outline"></i>新增宠物</el-button
          >
        </el-form-item>
      </el-form>

      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column prop="petId" label="宠物编号"> </el-table-column>
          <el-table-column prop="name" label="宠物昵称"> </el-table-column>
          <el-table-column prop="sex" label="性别"> </el-table-column>
          <el-table-column prop="species" label="品种"> </el-table-column>

          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state === 0">未领养</el-tag>
              <el-tag v-if="scope.row.state === 1" type="info">已领养</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="修改信息">
            <template slot-scope="">
              <el-button type="success" size="mini" icon="el-icon-edit">
                修改信息
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="删除">
            <template slot-scope="">
              <el-button type="danger" size="mini" icon="el-icon-delete">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <petCreateForm ref="petCreateForm" ></petCreateForm>
    <upImage ref="upImage"></upImage>
  </div>
</template>

<script>
import Head from "../components/module";
import petCreateForm from "../components/petCreateForm";
import upImage from "../components/image"
export default {
  components: {
    Head,
    petCreateForm,
    upImage
  },
  data() {
    return {
      form: {
        petId: "",
        name: "",
        sex: "",
        species: "",
        state: 1,
        operation: "",
      },
      addPet() {
        this.$refs.petCreateForm.open();
      },
       upImage() {
        this.$refs.upImage.open();
      },
      tableData: [
        {
          petId: "1",
          name: "开开",
          sex: "公",
          species: "牧羊犬",
          state: 1,
          operation: "修改信息",
        },
        {
          petId: "1",
          name: "开开",
          sex: "公",
          species: "牧羊犬",
          state: 0,
          operation: "修改信息",
        },
        {
          petId: "1",
          name: "开开",
          sex: "公",
          species: "牧羊犬",
          state: 0,
          operation: "修改信息",
        },
        {
          petId: "1",
          name: "开开",
          sex: "公",
          species: "牧羊犬",
          state: 1,
          operation: "修改信息",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.petForm {
  display: flex;
  justify-content: center;
  padding: 20px;
 
  margin: 20px 20px 0px;
}
.el-form-item {
  padding: 2%;
}

.petTable {
  
}

.petTable::after {
  display: block;
  content: "";
  clear: both;
}

.table {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.22);
  padding: 22px;
  margin: 20px;
}
</style>
