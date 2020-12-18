<template>
  <div>
    <Head />
    <div class="petTable">
      <el-form ref="form" class="petForm">
        <!-- <el-form-item>
          <el-input placeholder="请输入机构名称"></el-input>
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button type="primary" @click="searchOrgan()"
            ><i class="el-icon-search"></i>查询</el-button
          > -->
          <el-button @click="handel_EditOrganInfo(false, '')"
            ><i class="el-icon-circle-plus-outline"></i>新增机构</el-button
          >
        </el-form-item>
      </el-form>

      <div class="table">
        <el-table
          :data="
            tableData.data.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            v-for="(item, index) in tableData.head"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              {{ scope.row[item.prop] }}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="250"
            class-name="small-padding fixed-width"
          >
            <template slot="header">
              <el-input
                v-model="search"
                placeholder="输入关键字搜索"
                size="mini"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="handel_EditOrganInfo(true, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="handle_DelPetInfo(scope.row.examId)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <organEdit ref="organEdit" @isUpdate="fetchData" />
  </div>
</template>

<script>
import Head from "../components/module";
import { getOrganList, delOrgan } from "../api/organ";
import organEdit from "../components/organ-edit.vue"; //编辑添加页

export default {
  components: {
    Head,
    organEdit
  },
  data () {
    return {
      search: '',
      dialogFormVisible: false,
      listLoading: false,

      tableData: {
        data: [],
        head: [
          { label: '机构名称', prop: 'name' }, { label: '登录账号', prop: 'account' }, { label: '登录密码', prop: 'password' }
        ]
      },
    };
  },
  created () {
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      getOrganList().then((result) => {
        this.$set(this.tableData, 'data', result.data.data)
        // console.log(this.tableData.data, '获取机构列表')
      });
    },
    // 编辑
    handel_EditOrganInfo (isEdit, info) {
      //添加、编辑事件
      this.$refs.organEdit.info = info
      this.$refs.organEdit.isEdit = isEdit
      this.$refs.organEdit.dialogFormVisible = true
    },
    //删除
    handle_DelPetInfo (id) {
      delOrgan({ id: id }).then(rest => {
        if (rest.data.code == '200') {
          this.fetchData()
          this.$message.success("删除成功!");
        }
        else
          this.$message.success("删除失败!");
      })
    },
    // 机构查询
    searchOrgan () {

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
