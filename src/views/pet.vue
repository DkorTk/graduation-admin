<template>
  <div>
    <Head />
    <div class="petTable">
      <el-form ref="form" :model="form" class="petForm">
        <el-form-item>
          <el-select
            @change="handel_animol"
            v-model="form.variteyFlg"
            placeholder="请选择宠物类别"
          >
            <el-option label="全部" value="-1"></el-option>
            <el-option label="猫" value="cat"></el-option>
            <el-option label="狗" value="dog"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入宠物昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="upImage()"
            ><i class="el-icon-search"></i>查询</el-button
          >
          <el-button @click="addPet()"
            ><i class="el-icon-circle-plus-outline"></i>新增宠物</el-button
          >
        </el-form-item>
      </el-form>

      <div class="table">
        <el-table :data="tableData.data" border>
          <el-table-column prop="name" label="宠物昵称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template></el-table-column
          >
          <el-table-column prop="age" label="年龄">
            <template slot-scope="scope">
              {{ scope.row.age }}
            </template></el-table-column
          >
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              {{ scope.row.sex == 1 ? "公" : "母" }}
            </template></el-table-column
          >
          <el-table-column prop="weight" label="体重">
            <template slot-scope="scope">
              {{ scope.row.weight + "Kg" }}
            </template></el-table-column
          >
          <el-table-column prop="species" label="品种">
            <template slot-scope="scope">
              {{ scope.row.species }}
            </template></el-table-column
          >
          <el-table-column
            prop="vaccine"
            :formatter="formatterVaccineFlg"
            label="是否接种疫苗"
          >
          </el-table-column>
          <el-table-column
            :formatter="formatterExParasiteFlg"
            prop="exParasite"
            label="是否驱虫"
          >
          </el-table-column>
          <el-table-column
            :formatter="formatterSterilizationFlg"
            prop="sterilization"
            label="是否绝育"
          >
          </el-table-column>
          <el-table-column prop="organization" label="所属机构">
            <template slot-scope="scope">
              {{ scope.row.organization }}
            </template></el-table-column
          >
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state == 0">未领养</el-tag>
              <el-tag v-if="scope.row.state == 1" type="info">已领养</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="修改信息">
            <template slot-scope="">
              <el-button type="success" size="mini" icon="el-icon-edit">
                修改信息
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="handle_DelPetInfo(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <petCreateForm
      @onSaveSuccess="onSaveSuccess"
      ref="petCreateForm"
    ></petCreateForm>
    <upImage ref="upImage"></upImage>
  </div>
</template>

<script>
import Head from "../components/module";
import petCreateForm from "../components/petCreateForm";
import upImage from "../components/image";
import { getPetList, delPetInfo } from "../api/pet";

export default {
  components: {
    Head,
    petCreateForm,
    upImage
  },
  data () {
    return {
      form: {
        petId: "",
        name: "",
        sex: "",
        species: "",
        state: 1,
        operation: "",
        variteyFlg: "-1"
      },
      tableData: { data: [] },
      addPet () {
        this.$refs.petCreateForm.open();
      },
      upImage () {
        this.$refs.upImage.open();
      },
    };
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      //获取宠物列表
      getPetList({ animal: this.form.variteyFlg, organ: '-1' }).then((result) => {
        this.$set(this.tableData, 'data', result.data.data)
        // console.log(this.tableData.data, '获取宠物列表')
      });
    },
    //下拉选择事件
    handel_animol () {
      this.fetchData()
    },
    //删除
    handle_DelPetInfo (id) {
      delPetInfo({ animal: this.form.variteyFlg, id: id }).then(rest => {
        if (rest.data.code == '200') {
          this.fetchData()
          this.$message.success("删除成功!");
        }
        else
          this.$message.success("删除失败!");
      })
    },
    onSaveSuccess () {
      this.fetchData()
    },

    //是否接种疫苗
    formatterVaccineFlg (row) {
      return row.vaccine == 0 ? "未接种" : "已接种"
    },
    //是否驱虫
    formatterExParasiteFlg (row) {
      return row.exParasite == 0 ? "未驱虫" : "已驱虫"
    },
    //是否绝育
    formatterSterilizationFlg (row) {
      return row.sterilization == 0 ? "未接种" : "已接种"
    },

  }
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
